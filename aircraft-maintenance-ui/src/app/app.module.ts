import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {KeycloakService} from "./services/keycloak/keycloak.service";
import {FormsModule} from "@angular/forms";
import {HttpTokenInterceptor} from "./services/interceptor/http-token.interceptor";
import {LoginComponent} from './pages/login/login.component';
import { KeycloakLoginComponent } from './pages/keycloak-login/keycloak-login.component';
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

export function kcFactory(kcService: KeycloakService){
  return () => kcService.init();
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    KeycloakLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      closeButton: true,
      newestOnTop: true,
      tapToDismiss: true,
      positionClass: 'toast-bottom-right',
      timeOut: 0
    })
  ],
  providers: [
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      deps: [KeycloakService],
      useFactory: kcFactory,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
