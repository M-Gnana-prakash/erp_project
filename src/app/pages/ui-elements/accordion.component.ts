import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [CommonModule],
  styles: [`
        .accordion-content {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
        }
        .accordion-content.open {
            max-height: 500px;
        }
    `],
  template: `
    <div class="p-6 space-y-10">
      <!-- Header -->
      <div>
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white">Accordion</h2>
        <p class="text-gray-500 dark:text-gray-400 mt-1">Expandable sections for FAQs, structured content, and grouped data.</p>
      </div>

      <!-- ── Default Accordion ── -->
      <section>
        <h3 class="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">Default</h3>
        <div class="border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden divide-y divide-gray-200 dark:divide-white/10">
          <div *ngFor="let item of defaultItems; let i = index">
            <button (click)="toggleDefault(i)"
                    class="w-full flex items-center justify-between px-5 py-4 text-left bg-white dark:bg-boxdark hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                    [attr.aria-expanded]="openDefault() === i">
              <span class="text-sm font-semibold text-gray-800 dark:text-white">{{ item.title }}</span>
              <svg class="w-5 h-5 text-gray-400 transition-transform duration-300" [class.rotate-180]="openDefault() === i" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </button>
            <div class="accordion-content" [class.open]="openDefault() === i">
              <div class="px-5 py-4 bg-gray-50 dark:bg-white/5">
                <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{{ item.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ── Flush (no border) ── -->
      <section>
        <h3 class="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">Flush Style</h3>
        <div class="divide-y divide-gray-200 dark:divide-white/10">
          <div *ngFor="let item of flushItems; let i = index">
            <button (click)="toggleFlush(i)"
                    class="w-full flex items-center justify-between py-4 text-left transition-colors group">
              <span class="text-sm font-semibold text-gray-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{{ item.title }}</span>
              <span class="w-6 h-6 rounded-full flex items-center justify-center bg-gray-100 dark:bg-white/10 text-gray-500 transition-transform duration-300" [class.rotate-45]="openFlush() === i">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              </span>
            </button>
            <div class="accordion-content" [class.open]="openFlush() === i">
              <div class="pb-4">
                <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{{ item.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ── With Icons ── -->
      <section>
        <h3 class="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">With Icons</h3>
        <div class="space-y-2">
          <div *ngFor="let item of iconItems; let i = index" class="border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden">
            <button (click)="toggleIcon(i)"
                    class="w-full flex items-center gap-3 px-5 py-4 text-left bg-white dark:bg-boxdark hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
              <span class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-white text-sm" [ngStyle]="{'background': item.color}">{{ item.icon }}</span>
              <span class="flex-1 text-sm font-semibold text-gray-800 dark:text-white">{{ item.title }}</span>
              <svg class="w-5 h-5 text-gray-400 transition-transform duration-300 flex-shrink-0" [class.rotate-180]="openIcon() === i" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </button>
            <div class="accordion-content" [class.open]="openIcon() === i">
              <div class="px-5 py-4 bg-gray-50 dark:bg-white/5">
                <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{{ item.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `
})
export class AccordionDemoComponent {
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
