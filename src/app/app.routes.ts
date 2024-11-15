//app routes ts
import { Routes } from '@angular/router';
import { HeroPageComponent } from './components/hero-page/hero-page.component';
import { DocumentSelectionComponent } from './components/reader/document-selection/document-selection.component';

export const routes: Routes = [
    {path: '', component: HeroPageComponent},
    { 
        path: 'reader', 
        loadComponent: () => import('./components/reader/reader.component').then(c => c.ReaderComponent),
        children: [
            {
                path: 'document-selection',
                loadComponent: () => import('./components/reader/document-selection/document-selection.component').then(c => c.DocumentSelectionComponent)
            },
            {
                path: 'read',
                loadComponent: () => import('./components/reader/read/read.component').then(c => c.ReadComponent)
            }
        ]
    },    {path: '**', component: HeroPageComponent},
];
