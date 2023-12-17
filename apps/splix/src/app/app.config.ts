import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, RouteReuseStrategy } from '@angular/router';
import { appRoutes } from './app.routes';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { AuthStore } from '@splix/auth/data-access';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideIonicAngular(),
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,
      IonicModule.forRoot(),
    ),
    AuthStore,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
};
