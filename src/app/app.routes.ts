import { Routes } from '@angular/router';

export const routes: Routes = [

    { path: 'dashboard', loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent) },
    { path: 'first', loadComponent: () => import('./first/first.component').then(m => m.FirstComponent) },
    { path: 'navigation', loadComponent: () => import('./navigation/navigation.component').then(m => m.NavigationComponent) },
    { path: 'second', loadComponent: () => import('./second/second.component').then(m => m.SecondComponent) }
];
