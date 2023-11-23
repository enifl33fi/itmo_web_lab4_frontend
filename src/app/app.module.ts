import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import {ImageModule} from "primeng/image";
import {CardModule} from "primeng/card";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import { SignUpComponent } from './sign-up/sign-up.component';
import {CheckboxModule} from "primeng/checkbox";
import {OverlayPanelModule} from "primeng/overlaypanel";
import { SignInComponent } from './sign-in/sign-in.component';
import { CustomInputComponent } from './custom-input/custom-input.component';
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {TokenInterceptor} from "./token.interceptor";


@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    SignUpComponent,
    SignInComponent,
    CustomInputComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ImageModule,
        CardModule,
        InputTextModule,
        ButtonModule,
        RippleModule,
        CheckboxModule,
        OverlayPanelModule,
        ReactiveFormsModule,
        HttpClientModule,
        ToastModule
    ],
  providers: [MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }