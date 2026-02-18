import { Injectable, signal, effect } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    darkMode = signal<boolean>(
        (localStorage.getItem('theme') === 'dark' ||
            (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches))
    );

    readonly theme$ = toObservable(this.darkMode).pipe(
        map(isDark => isDark ? 'dark' : 'light')
    );

    primaryColor = signal<string>(localStorage.getItem('primaryColor') || '#3C50E0');

    constructor() {
        effect(() => {
            if (this.darkMode()) {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            }
        });

        effect(() => {
            const color = this.primaryColor();
            document.documentElement.style.setProperty('--primary', color);
            localStorage.setItem('primaryColor', color);
        });
    }

    toggleTheme() {
        this.darkMode.update(val => !val);
    }

    setPrimaryColor(color: string) {
        this.primaryColor.set(color);
    }
}
