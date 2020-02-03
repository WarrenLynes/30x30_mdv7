import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { currentKicks, currentSelection, hasCurrentKicks } from './kicks.reducer';
import { Shoe } from '@mdv7/core-data';
import { State } from '@mdv7/core-state';
import { load, reset, select } from './kicks.actions';

@Injectable()
export class KicksFacade {
  get hasKicks$(): Observable<boolean> {
    return this.store.select(hasCurrentKicks);
  }

  get kicks$(): Observable<Shoe[]> {
    return this.store.select(currentKicks);
  }

  get selected$(): Observable<Shoe> {
    return this.store.select(currentSelection);
  }

  constructor(private store: Store<State>) {}


  load() {
    this.store.dispatch(load());
  }

  select(entity: Shoe) {
    this.store.dispatch(select({entity}));
  }

  reset() {
    this.store.dispatch(reset())
  }
}
