import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type McvAvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

@Component({
    selector: 'app-mcv-avatar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './mcv-avatar.html',
    styleUrl: './mcv-avatar.css'
})
export class McvAvatar {
    @Input() src: string = '';
    @Input() initials: string = '';
    @Input() name: string = '';
    @Input() size: McvAvatarSize = 'md';
    @Input() status: 'online' | 'away' | 'busy' | 'offline' | null = null;
    @Input() badge: string | number | null = null;
    @Input() bgColor: string = '#6366f1';
    @Input() rounded: boolean = true;

    getSizeClasses(): string {
        const sizes: Record<McvAvatarSize, string> = {
            xs: 'w-8 h-8 text-xs',
            sm: 'w-10 h-10 text-xs',
            md: 'w-12 h-12 text-sm',
            lg: 'w-14 h-14 text-base',
            xl: 'w-20 h-20 text-xl',
            '2xl': 'w-24 h-24 text-2xl'
        };
        return sizes[this.size] || sizes.md;
    }

    getStatusColor(): string {
        const colors = {
            online: 'bg-green-500',
            away: 'bg-yellow-400',
            busy: 'bg-red-500',
            offline: 'bg-gray-400'
        };
        return this.status ? colors[this.status] : '';
    }
}
