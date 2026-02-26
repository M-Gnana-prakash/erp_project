import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TtsService {
    private backendUrl = 'http://localhost:8000/api/tts.php'; // PHP backend URL

    constructor(private http: HttpClient) { }

    generateBackendAudio(text: string, language: string): Observable<any> {
        const payload = {
            text: text,
            language: language
        };
        return this.http.post(this.backendUrl, payload);
    }
}
