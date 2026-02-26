import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TtsService } from '../../core/services/tts.service';

@Component({
    selector: 'app-tts',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './tts.component.html',
    styleUrls: ['./tts.component.css']
})
export class TtsComponent implements OnInit, OnDestroy {
    // Approach A: Browser API variables
    textToSpeakA: string = '.....';
    voices: SpeechSynthesisVoice[] = [];
    selectedVoice: SpeechSynthesisVoice | null = null;
    selectedLanguage: string = 'en-US';

    // Approach B: PHP Backend API variables
    textToSpeakB: string = '.....';
    selectedLanguageB: string = 'en-US';
    private currentAudio: HTMLAudioElement | null = null;
    isBackendProcessing: boolean = false;

    private ttsService = inject(TtsService);

    ngOnInit(): void {
        // Attempt to load voices immediately
        this.loadVoices();
        // Some browsers need this event to load voices
        if (typeof window !== 'undefined' && window.speechSynthesis) {
            window.speechSynthesis.onvoiceschanged = () => {
                this.loadVoices();
            };
        }
    }

    ngOnDestroy(): void {
        this.stopSpeechA();
        this.stopAudioB();
        if (typeof window !== 'undefined' && window.speechSynthesis) {
            window.speechSynthesis.onvoiceschanged = null;
        }
    }

    // --- Approach A: Web Speech API ---

    loadVoices(): void {
        if (typeof window !== 'undefined' && window.speechSynthesis) {
            this.voices = window.speechSynthesis.getVoices();
            if (this.voices.length > 0 && !this.selectedVoice) {
                this.selectedVoice = this.voices.find(v => v.lang.includes(this.selectedLanguage)) || this.voices[0];
            }
        }
    }

    onLanguageChangeA(event: any): void {
        this.selectedLanguage = event.target.value;
        this.selectedVoice = this.voices.find(v => v.lang.includes(this.selectedLanguage)) || this.voices[0];
    }

    onVoiceChangeA(event: any): void {
        const voiceName = event.target.value;
        this.selectedVoice = this.voices.find(v => v.name === voiceName) || null;
    }

    speakA(): void {
        if (!this.textToSpeakA.trim()) return;

        this.stopSpeechA();

        const utterance = new SpeechSynthesisUtterance(this.textToSpeakA);
        if (this.selectedVoice) {
            utterance.voice = this.selectedVoice;
        }

        window.speechSynthesis.speak(utterance);
    }

    stopSpeechA(): void {
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
        }
    }

    // --- Approach B: PHP Backend API ---

    generateFromBackend(): void {
        if (!this.textToSpeakB.trim()) return;

        this.stopAudioB();
        this.isBackendProcessing = true;

        this.ttsService.generateBackendAudio(this.textToSpeakB, this.selectedLanguageB)
            .subscribe({
                next: (response) => {
                    this.isBackendProcessing = false;
                    if (response.audioUrl) {
                        this.currentAudio = new Audio(response.audioUrl);
                        this.currentAudio.play();
                    }
                },
                error: (err) => {
                    console.error('API Error:', err);
                    this.isBackendProcessing = false;
                }
            });
    }

    stopAudioB(): void {
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio.currentTime = 0;
        }
    }
}
