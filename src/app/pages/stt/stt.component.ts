import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface IWindow extends Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
}

@Component({
    selector: 'app-stt',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './stt.component.html',
    styleUrls: ['./stt.component.css']
})
export class SttComponent implements OnInit, OnDestroy {

    transcribedText: string = '';
    originalText: string = '';
    interimTranscript: string = '';
    selectedLanguage: string = 'en-IN';

    isRecording: boolean = false;
    recognition: any = null;
    errorMessage: string = '';

    translateToEnglish: boolean = true;

    constructor(private ngZone: NgZone) { }

    ngOnInit(): void {
        this.initSpeechRecognition();
    }

    ngOnDestroy(): void {
        this.stopRecording();
    }

    // -------------------------------
    // Initialize Speech Recognition
    // -------------------------------
    private initSpeechRecognition(): void {

        const { SpeechRecognition, webkitSpeechRecognition } =
            (window as unknown as IWindow);

        const SpeechRecognitionClass =
            SpeechRecognition || webkitSpeechRecognition;

        if (!SpeechRecognitionClass) {
            console.error('Speech Recognition API not supported.');
            return;
        }

        this.recognition = new SpeechRecognitionClass();

        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = this.selectedLanguage;

        // Start Event
        this.recognition.onstart = () => {
            this.ngZone.run(() => {
                this.isRecording = true;
            });
        };

        // Result Event
        this.recognition.onresult = (event: any) => {
            this.ngZone.run(() => {
                let finalTranscript = '';
                this.interimTranscript = '';

                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const transcript = event.results[i][0].transcript;

                    if (event.results[i].isFinal) {
                        finalTranscript += transcript;
                    } else {
                        this.interimTranscript += transcript;
                    }
                }

                if (finalTranscript) {
                    this.processFinalTranscript(finalTranscript);
                }
            });
        };

        // Error Event
        this.recognition.onerror = (event: any) => {
            console.error('Speech recognition error:', event.error);

            this.ngZone.run(() => {
                this.isRecording = false;

                if (event.error === 'not-allowed') {
                    this.errorMessage = 'Microphone permission denied.';
                } else if (event.error === 'no-speech') {
                    this.errorMessage = 'No speech detected. Please try again.';
                } else if (event.error === 'network') {
                    this.errorMessage = 'Network error. Are you offline or is the Google Speech service blocked?';
                } else {
                    this.errorMessage = `Error: ${event.error}`;
                }
            });
        };

        // End Event
        this.recognition.onend = () => {
            this.ngZone.run(() => {
                this.isRecording = false;
                if (!this.errorMessage && this.isRecording) {
                    // Can handle unexpected stops here
                }
            });
        };
    }

    // -------------------------------
    // Start Recording
    // -------------------------------
    startRecording(): void {
        this.errorMessage = '';

        if (!this.recognition) {
            this.errorMessage = 'Speech Recognition is not supported in this browser. Please use Chrome or Edge.';
            return;
        }

        if (!this.isRecording) {
            try {
                this.recognition.lang = this.selectedLanguage;
                this.recognition.start();
            } catch (e: any) {
                console.error("Failed to start recognition:", e);
                this.errorMessage = "Could not start recording. Try refreshing the page.";
            }
        }
    }

    // -------------------------------
    // Stop Recording
    // -------------------------------
    stopRecording(): void {
        if (this.recognition && this.isRecording) {
            this.recognition.stop();
        }
    }

    // -------------------------------
    // Language Change
    // -------------------------------
    onLanguageChange(): void {

        if (!this.recognition) return;

        this.recognition.lang = this.selectedLanguage;

        // Restart if currently recording
        if (this.isRecording) {
            this.recognition.stop();
            setTimeout(() => {
                this.recognition.start();
            }, 200);
        }
    }

    // -------------------------------
    // Clear Text
    // -------------------------------
    clearText(): void {
        this.transcribedText = '';
        this.originalText = '';
        this.interimTranscript = '';
    }

    // -------------------------------
    // Display Combined Text
    // -------------------------------
    get displayOriginalText(): string {
        return this.originalText +
            (this.interimTranscript
                ? (this.originalText ? ' ' : '') + this.interimTranscript
                : '');
    }

    get displayTranslatedText(): string {
        return this.transcribedText;
    }

    // -------------------------------
    // Translation Logic
    // -------------------------------
    private async processFinalTranscript(text: string) {
        if (!text.trim()) return;

        const processedText = this.parsePunctuation(text);

        this.originalText += (this.originalText ? ' ' : '') + processedText;

        if (this.translateToEnglish && !this.selectedLanguage.startsWith('en')) {
            try {
                const translatedText = await this.translateText(processedText, this.selectedLanguage, 'en');
                this.ngZone.run(() => {
                    this.transcribedText += (this.transcribedText ? ' ' : '') + translatedText;
                });
            } catch (error) {
                console.error('Translation failed', error);
                this.ngZone.run(() => {
                    this.transcribedText += (this.transcribedText ? ' ' : '') + processedText;
                });
            }
        } else {
            this.transcribedText += (this.transcribedText ? ' ' : '') + processedText;
        }
    }

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

    private async translateText(text: string, sourceLang: string, targetLang: string = 'en'): Promise<string> {
        const langMap: { [key: string]: string } = {
            'en-IN': 'en', 'en-US': 'en', 'en-GB': 'en',
            'es-ES': 'es', 'fr-FR': 'fr', 'hi-IN': 'hi', 'ta-IN': 'ta'
        };
        const sl = langMap[sourceLang] || 'auto';

        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Translation API failed');
        const data = await response.json();
        return data[0].map((item: any) => item[0]).join('');
    }
}