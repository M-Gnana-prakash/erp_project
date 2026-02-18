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
import { AlertsComponent } from './pages/ui-elements/alerts.component';
import { AvatarComponent } from './pages/ui-elements/avatar.component';
import { BadgesComponent } from './pages/ui-elements/badges.component';
import { ButtonsComponent } from './pages/ui-elements/buttons.component';
import { ImagesComponent } from './pages/ui-elements/images.component';
import { VideosComponent } from './pages/ui-elements/videos.component';
import { SigninComponent } from './pages/auth/signin.component';
import { SignupComponent } from './pages/auth/signup.component';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'dashboard/ecommerce', component: EcommerceComponent },
    { path: 'calender', component: CalendarComponent },
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
            { path: 'advanced-page', component: AdvancedPageComponent }
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
            { path: 'alerts', component: AlertsComponent },
            { path: 'avatar', component: AvatarComponent },
            { path: 'badges', component: BadgesComponent },
            { path: 'buttons', component: ButtonsComponent },
            { path: 'images', component: ImagesComponent },
            { path: 'videos', component: VideosComponent }
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
