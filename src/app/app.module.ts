import {APP_INITIALIZER, NgModule} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './model/components/external/welcome-page/welcome-page.component';
import {ImageModule} from "primeng/image";
import {CardModule} from "primeng/card";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import { SignUpComponent } from './model/components/external/sign-up/sign-up.component';
import {CheckboxModule} from "primeng/checkbox";
import {OverlayPanelModule} from "primeng/overlaypanel";
import { SignInComponent } from './model/components/external/sign-in/sign-in.component';
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {TokenInterceptor} from "./core/interceptor/token.interceptor";
import { MainComponent } from './model/components/external/main/main.component';
import {StorageService} from "./utils/storage/storage.service";
import { MenubarComponent } from './model/components/embeded/menubar/menubar.component';
import { AuthLayoutComponent } from './model/layout/auth-layout/auth-layout.component';
import { BasicLayoutComponent } from './model/layout/basic-layout/basic-layout.component';
import { TableComponent } from './model/components/embeded/table/table.component';
import {TableModule} from "primeng/table";
import { CanvasComponent } from './model/components/embeded/canvas/canvas.component';


@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    SignUpComponent,
    SignInComponent,
    MainComponent,
    MenubarComponent,
    AuthLayoutComponent,
    BasicLayoutComponent,
    TableComponent,
    CanvasComponent
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
    ToastModule,
    TableModule
  ],
  providers: [MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (storageService: StorageService) => () => storageService.onInit(),
      deps: [StorageService],
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
