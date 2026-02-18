import { Component, inject } from '@angular/core';
import { ThemeService } from '../../../../core/services/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-theme-toggle-button',
  templateUrl: './theme-toggle-button.html',
  standalone: true,
  imports: [CommonModule]
})
export class ThemeToggleButtonComponent {

  private themeService = inject(ThemeService);
  theme$ = this.themeService.theme$;

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
