import { Injectable, signal } from '@angular/core';

export type UserRole = 'Administrator' | 'Moderator' | 'User';

export interface UserProfile {
    name: string;
    email: string;
    role: UserRole;
    avatar: string;
}

@Injectable({
    providedIn: 'root'
})
export class UserService {
    readonly availableRoles: UserRole[] = ['Administrator', 'Moderator', 'User'];

    currentUser = signal<UserProfile>({
        name: 'anbu',
        email: 'anbu@gmail.com',
        role: 'Administrator',
        avatar: 'anbu'
    });

    setRole(role: UserRole): void {
        this.currentUser.update(user => ({ ...user, role }));
    }
}
