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
        path: 'accueil',
        loadComponent: () =>
          import('./pages/acceuil/acceuil.page').then((m) => m.AcceuilPage),
      },
      {
        path: 'apropos',
        loadComponent: () =>
          import('./pages/apropos/apropos.page').then((m) => m.AproposPage),
      },
      {
        path: '**',
        redirectTo: 'app',
      },
    ],
  },
  {
    path: 'tabs',
    loadComponent: () =>
      import('./pages/tabs/tabs.page').then((m) => m.TabsPage),
  },

  //   {
  //   path: 'service/:id',
  //   loadComponent: () => import('./pages/service/service.page').then(m => m.ServicePage)
  // }
];
