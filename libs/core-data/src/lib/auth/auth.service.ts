import { Injectable } from '@angular/core';
import { Credentials } from './credentials';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _authenticated = new BehaviorSubject(false);

  get authenticated() {
    return this._authenticated.asObservable();
  }

  constructor( ) {
    if(localStorage.getItem('TOKEN'))
      this._authenticated.next(true);
  }

  isAuthenticated() {
    return localStorage.getItem('TOKEN');
  }

  authenticate({name, password}: Credentials) {
    if(name && password) {
      localStorage.setItem('TOKEN', 'AUTHED');
      this._authenticated.next(true);
    } else {
      localStorage.removeItem('TOKEN');
    }
  }

  logout() {
    localStorage.removeItem('TOKEN');
    this._authenticated.next(false);
  }
}
