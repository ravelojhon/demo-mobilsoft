import { Routes } from '@angular/router';

export const routes: Routes = [

    { path: 'dashboard', loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent) },
    { path: 'aspirantes', loadComponent: () => import('./features/aspirantes/aspirantes.component').then(m => m.AspirantesComponent) },
    { path: 'second', loadComponent: () => import('./second/second.component').then(m => m.SecondComponent) },
    { path: 'orden', loadComponent: () => import('./features/orden-evaluacion/orden-evaluacion.component').then(m => m.OrdenComponent) },
    { path: 'Omedica', loadComponent: () => import('./features/orden-medica/orden-medica.component').then(m => m.OrdenMedicaComponent) },
    { path: 'Hclinica', loadComponent: () => import('./features/historia-clinica/historia-clinica.component').then(m => m.HistoriaClinicaComponent) },
    { path: 'Prestadores', loadComponent: () => import('./features/prestadores/prestadores.component').then(m => m.PrestadoresComponent) },
    { path: 'HclinicaLaboral', loadComponent: () => import('./features/historia-clinica-laboral/historia-clinica-laboral.component').then(m => m.HistoriaClinicaLaboralComponent) }
];
