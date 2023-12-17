import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('@splix/sign-in/feature').then(m => m.SignInComponent)
  },
  {
    path: 'sign-in',
    loadComponent: () => import('@splix/sign-in/feature').then(m => m.SignInComponent)
  },
  {
    path: 'sign-up',
    loadComponent: () => import('@splix/sign-up/feature').then(m => m.SignUpComponent)
  },
  {
    path: 'tab',
    loadComponent: () => import('@splix/shared/ui/tab').then(m => m.TabComponent),
    loadChildren: () => import('@splix/shared/ui/tab').then(m => m.TAB_ROUTES)
  }
];
