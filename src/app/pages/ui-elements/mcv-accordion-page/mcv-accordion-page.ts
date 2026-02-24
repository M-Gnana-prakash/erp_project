import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { McvAccordion } from '../../../shared/components/ui/mcv-accordion/mcv-accordion';

@Component({
    selector: 'app-mcv-accordion-page',
    standalone: true,
    imports: [CommonModule, McvAccordion],
    templateUrl: './mcv-accordion-page.html',
    styleUrl: './mcv-accordion-page.css'
})
export class McvAccordionPage {
    openDefault = signal<number | null>(0);
    openFlush = signal<number | null>(null);
    openIcon = signal<number | null>(null);

    toggleDefault(i: number) { this.openDefault.set(this.openDefault() === i ? null : i); }
    toggleFlush(i: number) { this.openFlush.set(this.openFlush() === i ? null : i); }
    toggleIcon(i: number) { this.openIcon.set(this.openIcon() === i ? null : i); }

    defaultItems = [
        { title: 'What is the refund policy?', content: 'We offer a 30-day full refund on all plans. If you are not satisfied with the product, contact our support team within 30 days of purchase and we will process your refund promptly.' },
        { title: 'How do I cancel my subscription?', content: 'You can cancel your subscription at any time from your account settings page. Once cancelled, you will continue to have access until the end of your current billing period.' },
        { title: 'Is my data secure?', content: 'Yes, we take data security very seriously. All data is encrypted at rest and in transit using industry-standard AES-256 encryption. We are fully GDPR and SOC 2 compliant.' },
        { title: 'Can I upgrade or downgrade my plan?', content: 'Absolutely! You can change your plan at any time. Upgrades take effect immediately and downgrades will apply at the next billing cycle.' },
    ];

    flushItems = [
        { title: 'Do you offer a free trial?', content: 'Yes! All new accounts receive a 14-day free trial with full access to all features. No credit card is required to start.' },
        { title: 'What payment methods do you accept?', content: 'We accept all major credit cards (Visa, Mastercard, AmEx), as well as PayPal and bank transfers for annual plans.' },
        { title: 'Is there a team/enterprise plan?', content: 'Yes, we have custom enterprise plans tailored to large teams. Contact our sales team for pricing and volume discounts.' },
    ];

    iconItems = [
        { icon: '🔒', title: 'Privacy & Security Settings', content: 'Manage your privacy preferences, 2FA authentication, connected devices, and active sessions from this section.', color: '#6366f1' },
        { icon: '💳', title: 'Billing & Subscription', content: 'View your current plan, update payment methods, download invoices, and manage your subscription lifecycle here.', color: '#10b981' },
        { icon: '🔔', title: 'Notification Preferences', content: 'Customize which email, push, and SMS notifications you receive and set your preferred frequency and channels.', color: '#f59e0b' },
    ];
}
