import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { KicksEffects } from './kicks.effects';
import { reducers } from './app.state';
import { AppFacade } from './app.facade';
import { KicksFacade } from './kicks.facade';


@NgModule({
  imports: [
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot([
      KicksEffects
    ]),
    StoreDevtoolsModule.instrument({ maxAge: 100 }),
  ],
  providers: [
    AppFacade,
    KicksFacade
  ]
})
export class CoreStateModule {}
