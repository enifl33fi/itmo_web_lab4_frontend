import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WelcomePageComponent} from "./welcome-page/welcome-page.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {SignInComponent} from "./sign-in/sign-in.component";
import {MainComponent} from "./main/main.component";
import {authGuard} from "./auth.guard";
import {protectedGuard} from "./protected.guard";
import {BasicLayoutComponent} from "./basic-layout/basic-layout.component";
import {AuthLayoutComponent} from "./auth-layout/auth-layout.component";

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
