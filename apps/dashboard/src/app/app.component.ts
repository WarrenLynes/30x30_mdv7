import { Component, Inject } from '@angular/core';
import { AuthService } from '@mdv7/core-data';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'mdv7-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dashboard';

  links = [
    {path: '/kicks', title: 'kicks'}
  ];

  get authenticated() {
    return this.authService.authenticated;
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/login')
  }

}
