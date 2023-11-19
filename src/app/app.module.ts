import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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


@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    SignUpComponent,
    SignInComponent
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
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
