import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROUTES as CONFIRMATION_ROUTES } from './components/confirmation/confirmation.module';
import { DefaultComponent } from './default';
import { GettingStarted } from './getting-started';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: DefaultComponent },
  { path: 'getting-started', component: GettingStarted },
  { path: 'components', pathMatch: 'full', redirectTo: 'components/accordion' },
  {
    path: 'components/confirmation',
    children: CONFIRMATION_ROUTES
  },
  { path: '**', redirectTo: 'home' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
  enableTracing: false,
  useHash: true
});
