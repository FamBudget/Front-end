import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/authentication/authentication.module').then((auth) => auth.AuthenticationModule),
  },
  {
    path: 'operations',
    loadChildren: () =>
      import('./modules/operations/operations.module').then((operations) => operations.OperationsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
