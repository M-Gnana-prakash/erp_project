import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EcommerceComponent } from './pages/dashboard/ecommerce.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { FormDemo } from './form-demo/form-demo';
import { AdvancedFormComponent } from './pages/forms/advanced-form.component';
import { BasicTableComponent } from './pages/tables/basic-table.component';
import { AdvancedTableComponent } from './pages/tables/advanced-table.component';
import { BasicPageComponent } from './pages/extra-pages/basic-page.component';
import { AdvancedPageComponent } from './pages/extra-pages/advanced-page.component';
import { LineChartComponent } from './pages/charts/line-chart.component';
import { BarChartComponent } from './pages/charts/bar-chart.component';
import { PieChartComponent } from './pages/charts/pie-chart.component';
import { McvAlertsPage } from './pages/ui-elements/mcv-alerts-page/mcv-alerts-page';
import { McvAvatarPage } from './pages/ui-elements/mcv-avatar-page/mcv-avatar-page';
import { McvBadgesPage } from './pages/ui-elements/mcv-badges-page/mcv-badges-page';
import { McvButtonsPage } from './pages/ui-elements/mcv-buttons-page/mcv-buttons-page';
import { McvImagesPage } from './pages/ui-elements/mcv-images-page/mcv-images-page';
import { McvVideosPage } from './pages/ui-elements/mcv-videos-page/mcv-videos-page';
import { McvCarouselPage } from './pages/ui-elements/mcv-carousel-page/mcv-carousel-page';
import { McvBreadcrumbsPage } from './pages/ui-elements/mcv-breadcrumbs-page/mcv-breadcrumbs-page';
import { McvListsPage } from './pages/ui-elements/mcv-lists-page/mcv-lists-page';
import { McvLinksPage } from './pages/ui-elements/mcv-links-page/mcv-links-page';
import { McvToastsPage } from './pages/ui-elements/mcv-toasts-page/mcv-toasts-page';
import { McvAccordionPage } from './pages/ui-elements/mcv-accordion-page/mcv-accordion-page';
import { McvDropdownPage } from './pages/ui-elements/mcv-dropdown-page/mcv-dropdown-page';
import { McvProgressBarsPage } from './pages/ui-elements/mcv-progress-bars-page/mcv-progress-bars-page';
import { McvSpinnersPage } from './pages/ui-elements/mcv-spinners-page/mcv-spinners-page';
import { SigninComponent } from './pages/auth/signin.component';
import { SignupComponent } from './pages/auth/signup.component';
import { McvCardsPage } from './pages/ui-elements/mcv-cards-page/mcv-cards-page';
import { McvModalsPage } from './pages/ui-elements/mcv-modals-page/mcv-modals-page';
import { McvDatatreePage } from './pages/ui-elements/mcv-datatree-page/mcv-datatree-page';
import { TtsComponent } from './pages/tts/tts.component';
import { SttComponent } from './pages/stt/stt.component';


export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'dashboard/ecommerce', component: EcommerceComponent },
    { path: 'calender', component: CalendarComponent },
    { path: 'tts', component: TtsComponent },
    { path: 'stt', component: SttComponent },
    { path: 'user-profile', component: UserProfileComponent },
    {
        path: 'forms',
        children: [
            { path: 'basic-form', component: FormDemo },
            { path: 'advanced-form', component: AdvancedFormComponent }
        ]
    },
    {
        path: 'tables',
        children: [
            { path: 'basic-table', component: BasicTableComponent },
            { path: 'advanced-table', component: AdvancedTableComponent }
        ]
    },
    {
        path: 'pages',
        children: [
            { path: 'basic-page', component: BasicPageComponent },
            { path: 'advanced-page', component: AdvancedPageComponent },
            { path: 'tts', component: TtsComponent }
        ]
    },
    {
        path: 'charts',
        children: [
            { path: 'line-chart', component: LineChartComponent },
            { path: 'bar-chart', component: BarChartComponent },
            { path: 'pie-chart', component: PieChartComponent }
        ]
    },
    {
        path: 'ui-elements',
        children: [
            { path: 'alerts', component: McvAlertsPage },
            { path: 'avatar', component: McvAvatarPage },
            { path: 'badges', component: McvBadgesPage },
            { path: 'buttons', component: McvButtonsPage },
            { path: 'images', component: McvImagesPage },
            { path: 'videos', component: McvVideosPage },
            { path: 'carousel', component: McvCarouselPage },
            { path: 'breadcrumbs', component: McvBreadcrumbsPage },
            { path: 'lists', component: McvListsPage },
            { path: 'links', component: McvLinksPage },
            { path: 'toasts', component: McvToastsPage },
            { path: 'accordion', component: McvAccordionPage },
            { path: 'button-dropdown', component: McvDropdownPage },
            { path: 'progress-bars', component: McvProgressBarsPage },
            { path: 'spinners', component: McvSpinnersPage },
            { path: 'cards', component: McvCardsPage },
            { path: 'modals', component: McvModalsPage },
            { path: 'data-tree', component: McvDatatreePage },
        ]
    },
    {
        path: 'authentication',
        children: [
            { path: 'sign-in', component: SigninComponent },
            { path: 'sign-up', component: SignupComponent }
        ]
    }
];
