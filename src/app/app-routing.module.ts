import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/authentication/authentication.module').then((auth) => auth.AuthenticationModule),
  },
  {
    path: 'accounts',
    loadChildren: () => import('./modules/accounts/accounts.module').then((accounts) => accounts.AccountsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
