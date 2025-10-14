import { Routes } from '@angular/router';

export const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'login',
  //   pathMatch: 'full',
  // },
  {
    path: '',
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.page').then((m) => m.RegisterPage),
  },
  {
    path: 'app',
    loadComponent: () =>
      import('./pages/menu/menu.page').then((m) => m.MenuPage),
    children: [
      {
        path: 'service',
        loadComponent: () =>
          import('./pages/service/service.page').then((m) => m.ServicePage),
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./pages/contact/contact.page').then((m) => m.ContactPage),
      },
      {
        path: '**',
        redirectTo: 'app',
      },
    ],
  },
];
