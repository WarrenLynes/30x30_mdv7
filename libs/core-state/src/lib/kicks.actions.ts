import { createAction, props } from '@ngrx/store';
import { Shoe } from '@mdv7/core-data';

export const load = createAction(
  '[KICKS][LOAD][REQUEST]'
);

export const loadSuccess = createAction(
  '[KICKS][LOAD][SUCCESS]',
  props<{ data: Shoe[] }>()
);

export const loadFailure = createAction(
  '[KICKS][LOAD][FAILURE]',
  props<{ error: any }>()
);
