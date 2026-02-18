import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, signal } from '@angular/core';
import { SidebarService } from '../../../../core/services/sidebar.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemeToggleButtonComponent } from '../../header/theme-toggle-button/theme-toggle-button';
import { NotificationDropdownComponent } from '../../header/notification-dropdown/notification-dropdown';
import { UserDropdownComponent } from '../../header/user-dropdown/user-dropdown';
import { McvInputField } from '../../form/mcv-input-field/mcv-input-field';

@Component({
  selector: 'app-app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ThemeToggleButtonComponent,
    NotificationDropdownComponent,
    UserDropdownComponent,
    McvInputField
  ],
  templateUrl: './app-header.html',
  styleUrl: './app-header.css',
})
export class AppHeaderComponent implements AfterViewInit, OnDestroy {
  isApplicationMenuOpen = false;
  readonly isMobileOpen$;

  searchValue = signal<string>('');

  @ViewChild('searchInput') searchInput!: McvInputField;

  constructor(public sidebarService: SidebarService) {
    this.isMobileOpen$ = this.sidebarService.isMobileOpen$;
  }

  handleToggle() {
    if (window.innerWidth >= 1280) {
      this.sidebarService.toggleExpanded();
    } else {
      this.sidebarService.toggleMobileOpen();
    }
  }

  toggleApplicationMenu() {
    this.isApplicationMenuOpen = !this.isApplicationMenuOpen;
  }

  ngAfterViewInit() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  ngOnDestroy() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (event: KeyboardEvent) => {
    if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
      event.preventDefault();
      this.searchInput?.focus();
    }
  };

  searchTextChange($event: any) {
    this.searchValue.set($event.value);
    console.log('Search:', $event.value);
  }
}
