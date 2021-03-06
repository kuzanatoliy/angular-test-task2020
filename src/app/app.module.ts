import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';

import { AuthEffects, ProfileEffects } from './store/effects';
import { authReducer, profileReducer } from './store/reducers';

import { TokenInterceptor } from './core/interceptors/token.interseptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EffectsModule.forRoot([
      AuthEffects,
      ProfileEffects
    ]),
    StoreModule.forRoot({
      authInfo: authReducer,
      profile: profileReducer
    }),
    HttpClientModule,
    AuthModule,
    SharedModule,
    ProfileModule
  ],
  providers: [{
    multi: true,
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
