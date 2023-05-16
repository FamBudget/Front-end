import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthenticationPageComponent } from './components/authentication-page/authentication-page.component';

const routes: Routes = [
  {
    path: '',
    component: AuthenticationPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
