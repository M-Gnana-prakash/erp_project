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
    interimTranscript: string = '';
    selectedLanguage: string = 'en-IN';

    isRecording: boolean = false;
    recognition: any = null;
    errorMessage: string = '';

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
                    this.transcribedText +=
                        (this.transcribedText ? ' ' : '') + finalTranscript;
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
        this.interimTranscript = '';
    }

    // -------------------------------
    // Display Combined Text
    // -------------------------------
    get displayText(): string {
        return this.transcribedText +
            (this.interimTranscript
                ? (this.transcribedText ? ' ' : '') + this.interimTranscript
                : '');
    }
}