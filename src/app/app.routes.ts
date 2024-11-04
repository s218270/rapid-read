import { Routes } from '@angular/router';
import { HeroPageComponent } from './components/hero-page/hero-page.component';

export const routes: Routes = [
    {path: '', component: HeroPageComponent},
    {path: 'reader', loadComponent: () => import('./components/reader/reader.component').then(c => c.ReaderComponent)}
];
