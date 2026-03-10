import { Injectable, NgZone } from '@angular/core';

interface IWindow extends Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
}

@Injectable({
    providedIn: 'root'
})
export class SttService {
    constructor(private ngZone: NgZone) { }

    recognize(
        onResult: (text: string) => void,
        onEnd: () => void,
        continuous: boolean = false
    ): any {
        const win = window as unknown as IWindow;
        const SpeechRecognitionClass = win.SpeechRecognition || win.webkitSpeechRecognition;

        if (!SpeechRecognitionClass) {
            console.error('Speech Recognition API not supported.');
            onEnd();
            return null;
        }

        const recognition = new SpeechRecognitionClass();
        recognition.continuous = continuous;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
            this.ngZone.run(() => {
                let finalTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript;
                    }
                }
                if (finalTranscript) {
                    onResult(finalTranscript.trim());
                }
            });
        };

        recognition.onerror = (event: any) => {
            console.error('STT error', event.error);
            this.ngZone.run(() => {
                onEnd();
            });
        };

        recognition.onend = () => {
            this.ngZone.run(() => {
                onEnd();
            });
        };

        try {
            recognition.start();
        } catch (e) {
            console.error(e);
            onEnd();
        }
        return recognition;
    }

    // Parse words to number (e.g. "twenty three" -> 23)
    parseNumber(text: string): string {
        const numWords: { [key: string]: number } = {
            zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9,
            ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16,
            seventeen: 17, eighteen: 18, nineteen: 19,
            twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90
        };

        // Check if it's already a number
        if (!isNaN(Number(text.replace(/\\s/g, '')))) return text.replace(/\\s/g, '');

        let total = 0;
        let current = 0;
        const words = text.toLowerCase().split(/\\s|-/);

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

        if (isNumberWords) {
            return total.toString();
        }

        return text;
    }

    // Convert spoken punctuation words into symbols
    parsePunctuation(text: string): string {
        const punctuationMap: { [key: string]: string } = {
            'period': '.',
            'comma': ',',
            'question mark': '?',
            'exclamation mark': '!',
            'colon': ':',
            'semicolon': ';',
            'dash': '-',
            'hyphen': '-',
            'underscore': '_',
            'star': '*',
            'asterisk': '*',
            'at sign': '@',
            'hash': '#',
            'pound': '#',
            'dollar sign': '$',
            'percent': '%',
            'ampersand': '&',
            'plus': '+',
            'equals': '=',
            'by': '/',
            'backslash': '\\'
        };

        let processedText = text.toLowerCase();

        // Use regex with word boundaries to replace punctuation words
        Object.keys(punctuationMap).forEach(word => {
            const regex = new RegExp(`\\b${word}\\b`, 'gi');
            processedText = processedText.replace(regex, punctuationMap[word]);
        });

        // Also handle cases where there might be a space before the punctuation
        // e.g., "Hello world ." -> "Hello world."
        processedText = processedText.replace(/\s+([.,!?:;])/g, '$1');

        // Capitalize first letter of sentences if possible (crude approach)
        processedText = processedText.replace(/(^|[.!?]\s+)([a-z])/g, (match) => match.toUpperCase());

        return processedText;
    }

    parsePassword(passwordStr: string): string {
        // Replace spelled out special characters with actual symbols
        const specialCharMap: { [key: string]: string } = {
            'at': '@',
            'dot': '.',
            'underscore': '_',
            'dash': '-',
            'hyphen': '-',
            'ampersand': '&',
            'plus': '+',
            'equals': '=',
            'slash': '/',
            'backslash': '\\'
        };

        // Split by spaces and process each part
        const parts = passwordStr.split(' ');
        let result = '';

        for (const part of parts) {
            const lowerPart = part.toLowerCase();

            if (specialCharMap[lowerPart]) {
                result += specialCharMap[lowerPart];
            } else if (lowerPart === 'space') {
                result += ' ';
            } else {
                result += part;
            }
        }

        return result;
    }

}
