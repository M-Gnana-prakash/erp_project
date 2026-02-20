import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    currentUser = signal({
        name: 'anbu',
        email: 'anbu@gmail.com',
        role: 'Administrator',
        avatar: 'anbu'
    });
}
