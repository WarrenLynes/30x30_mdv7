import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { currentKicks, hasCurrentKicks } from './kicks.reducer';
import { Shoe } from '@mdv7/core-data';
import { State } from '@mdv7/core-state';
import { load } from './kicks.actions';

@Injectable()
export class KicksFacade {
  get hasCurrentKicks$(): Observable<boolean> {
    return this.store.select(hasCurrentKicks);
  }

  get currentBenefits$(): Observable<Shoe[]> {
    return this.store.select(currentKicks);
  }

  constructor(private store: Store<State>) {}

  load() {
    this.store.dispatch(load());
  }
}
