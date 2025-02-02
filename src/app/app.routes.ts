import { Routes } from '@angular/router';

export const routes: Routes = [

    { path: 'dashboard', loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent) },
    { path: 'aspirantes', loadComponent: () => import('./features/aspirantes/aspirantes.component').then(m => m.AspirantesComponent) },
    { path: 'navigation', loadComponent: () => import('./navigation/navigation.component').then(m => m.NavigationComponent) },
    { path: 'second', loadComponent: () => import('./second/second.component').then(m => m.SecondComponent) }
];
