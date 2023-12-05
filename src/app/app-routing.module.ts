import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WelcomePageComponent} from "./model/components/external/welcome-page/welcome-page.component";
import {SignUpComponent} from "./model/components/external/sign-up/sign-up.component";
import {SignInComponent} from "./model/components/external/sign-in/sign-in.component";
import {MainComponent} from "./model/components/external/main/main.component";
import {authGuard} from "./core/guard/auth.guard";
import {protectedGuard} from "./core/guard/protected.guard";
import {BasicLayoutComponent} from "./model/layout/basic-layout/basic-layout.component";
import {AuthLayoutComponent} from "./model/layout/auth-layout/auth-layout.component";

const routes: Routes = [
  {
    path: '',
    component: BasicLayoutComponent,
    children: [
      { path: '',  component: WelcomePageComponent, canActivate: [authGuard] },
      { path: 'main', component: MainComponent, canActivate: [protectedGuard] }
    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'signup', component: SignUpComponent, canActivate: [authGuard] },
      { path: 'signin', component: SignInComponent, canActivate: [authGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    bindToComponentInputs: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
