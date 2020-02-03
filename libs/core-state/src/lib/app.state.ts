import { appReducer, IAppState } from './app.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { IKicksState, kicksReducer } from './kicks.reducer';

export interface State {
  app: IAppState;
  kicks: IKicksState;
}

export const reducers: ActionReducerMap<State> = {
  app: appReducer,
  kicks: kicksReducer,
};
