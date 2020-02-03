import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Shoe, ShoesService } from '@mdv7/core-data';
import { Store } from '@ngrx/store';
import { State } from '@mdv7/core-state';
import { load, loadSuccess, loadFailure } from './kicks.actions';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable()
export class KicksEffects {
  constructor(
    private actions$: Actions,
    private service: ShoesService,
    private store: Store<State>
  ) {}

  load$ = createEffect(
    () => this.actions$.pipe(
      ofType(load),
      exhaustMap(() =>
        this.service.all().pipe(
          map((kicks: Shoe[]) => loadSuccess({data: kicks})),
          catchError(error => of(loadFailure({error})))
        )
      )
    )
  );
}
