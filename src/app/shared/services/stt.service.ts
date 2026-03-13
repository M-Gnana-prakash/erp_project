import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

interface IWindow extends Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
}

@Injectable({
    providedIn: 'root'
})
export class SttService {
    private recognition: any = null;

    constructor(private ngZone: NgZone, private http: HttpClient) { }

    /**
     * Sends recognized text to the backend for MySQL storage
     */
    async saveTranscription(transcript: string, formId: string = 'unknown', fieldName: string = 'none') {
        try {
            await lastValueFrom(this.http.post('http://localhost:8000/api/stt_save.php', {
                transcript,
                form_id: formId,
                field_name: fieldName
            }));
        } catch (error) {
            console.error('Failed to save transcription to backend', error);
        }
    }

    /**
     * Start browser-native speech recognition
     * @param onResult Callback for final or interim text
     * @param onEnd Callback when recognition stops
     * @param continuous Keep listening or stop after one sentence
     */
    recognize(
        onResult: (text: string) => void,
        onEnd: () => void,
        continuous: boolean = false
    ): any {
        const win = window as unknown as IWindow;
        const SpeechRecognitionClass = win.SpeechRecognition || win.webkitSpeechRecognition;

        if (!SpeechRecognitionClass) {
            console.error('Browser Speech Recognition API not supported.');
            onEnd();
            return null;
        }

        this.recognition = new SpeechRecognitionClass();
        this.recognition.continuous = continuous;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';

        this.recognition.onresult = (event: any) => {
            this.ngZone.run(() => {
                let transcript = '';
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    transcript += event.results[i][0].transcript;
                }
                if (transcript) {
                    onResult(transcript);
                }
            });
        };

        this.recognition.onerror = (event: any) => {
            console.error('STT error', event.error);
            this.ngZone.run(() => {
                onEnd();
            });
        };

        this.recognition.onend = () => {
            this.ngZone.run(() => {
                onEnd();
            });
        };

        try {
            this.recognition.start();
        } catch (e) {
            console.error(e);
            onEnd();
        }
        return this.recognition;
    }

    stop() {
        if (this.recognition) {
            this.recognition.stop();
        }
    }

    // --- Helpers ---

    parseNumber(text: string): string {
        const numWords: { [key: string]: number } = {
            zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9,
            ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16,
            seventeen: 17, eighteen: 18, nineteen: 19,
            twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90
        };

        if (!isNaN(Number(text.replace(/\s/g, '')))) return text.replace(/\s/g, '');

        let total = 0;
        let current = 0;
        const words = text.toLowerCase().split(/\s|-/);

        let isNumberWords = false;
        for (const w of words) {
            if (numWords[w] !== undefined) {
                isNumberWords = true;
                current += numWords[w];
            } else if (w === 'hundred') {
                isNumberWords = true;
                current = (current === 0 ? 1 : current) * 100;
            } else if (w === 'thousand') {
                isNumberWords = true;
                total += current * 1000;
                current = 0;
            }
        }
        total += current;
        return isNumberWords ? total.toString() : text;
    }

    parsePunctuation(text: string): string {
        const punctuationMap: { [key: string]: string } = {
            'period': '.', 'comma': ',', 'question mark': '?', 'exclamation mark': '!',
            'colon': ':', 'semicolon': ';', 'dash': '-', 'hyphen': '-',
            'underscore': '_', 'star': '*', 'asterisk': '*', 'at sign': '@',
            'hash': '#', 'pound': '#', 'dollar sign': '$', 'percent': '%',
            'ampersand': '&', 'plus': '+', 'equals': '=', 'by': '/', 'backslash': '\\'
        };

        let processedText = text.toLowerCase();
        Object.keys(punctuationMap).forEach(word => {
            const regex = new RegExp(`\\b${word}\\b`, 'gi');
            processedText = processedText.replace(regex, punctuationMap[word]);
        });
        processedText = processedText.replace(/\s+([.,!?:;])/g, '$1');
        processedText = processedText.replace(/(^|[.!?]\s+)([a-z])/g, (match) => match.toUpperCase());
        return processedText;
    }
}
