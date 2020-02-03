import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@mdv7/core-data';
import { Router } from '@angular/router';
import { filter, tap } from 'rxjs/operators';
import { CustomValidators } from '../../custom-validators';

@Component({
  selector: 'mdv7-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private service: AuthService, private router: Router) {
    this.buildForm();
  }

  ngOnInit() {
    this.service.authenticated.subscribe((x) => {
      if(x) {
        this.router.navigateByUrl('/');
      } else {
        this.router.navigateByUrl('/login');
      }
    });
  }

  submit() {
    this.service.authenticate(this.loginForm.value);
  }

  buildForm() {
    this.loginForm = new FormGroup({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(10),
        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
      ]))
    });
  }
}
