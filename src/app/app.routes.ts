import {Routes} from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'posts',
  },
  {
    path: 'identity',
    loadChildren: () =>
      import('./identity/identity.routes').then((mod) => mod.AUTH_ROUTES),
  },
  {
    path: 'posts',
    loadChildren: () =>
      import('./posts/posts.routes').then((mod) => mod.POSTS_ROUTES),
  },
  {
    path: '**',
    redirectTo: '',
  }
];
