import { Component, signal, inject } from '@angular/core';
import { AppHeaderComponent } from './shared/components/layout/app-header/app-header';
import { AppSidebar } from './shared/components/layout/app-sidebar/app-sidebar';
import { AppHorizontalSidebarComponent } from './shared/components/layout/app-horizontal-sidebar/app-horizontal-sidebar';
import { SettingsComponent } from './shared/components/layout/settings/settings.component';
import { SidebarService } from './core/services/sidebar.service';
import { ThemeService } from './core/services/theme.service';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    AppHeaderComponent,
    AppSidebar,
    AppHorizontalSidebarComponent,
    SettingsComponent,
    RouterOutlet
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  router = inject(Router);
  sidebarService = inject(SidebarService);
  themeService = inject(ThemeService);
  protected readonly title = signal('ErpProject');
}

