import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    currentUser = signal({
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'Administrator',
        avatar: 'JD'
    });
}
