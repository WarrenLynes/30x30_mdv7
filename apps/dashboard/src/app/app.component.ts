import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@mdv7/core-data';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AppFacade } from '../../../../libs/core-state/src/lib/app.facade';

@Component({
  selector: 'mdv7-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  initialized$
  title = 'dashboard';

  links = [
    {path: '/kicks', title: 'kicks'}
  ];

  get authenticated() {
    return this.authService.authenticated;
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private facade: AppFacade
  ) {}

  ngOnInit(): void {
    this.initialized$ = this.facade.initialized$;
    this.facade.initialize();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/login')
  }

}
