import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import {registerReducers} from "./ngrx/reducers/auth/register.reducers";
import {RegisterEffects} from "./ngrx/effects/auth/register.effects";
import {provideHttpClient} from "@angular/common/http";
import {loginReducers} from "./ngrx/reducers/auth/login.reducers";
import {LoginEffects} from "./ngrx/effects/auth/login.effects";


export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideHttpClient(),
        provideStore({
            register: registerReducers,
            login: loginReducers
        }),
        provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
        provideEffects([
            RegisterEffects,
            LoginEffects
        ])
    ]
};
