import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatSliderModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'kicks', pathMatch: 'full' },
  { path: 'kicks', canActivate: [AuthGuard],  loadChildren: () => import('./kicks/kicks.module').then(m => m.KicksModule) },
  { path: 'login', component: LoginComponent },
  { path: 'lostnfound', component: NotFoundComponent },
  { path: '**', redirectTo: 'lostnfound', pathMatch: 'full' }
];

@NgModule({
  declarations: [ AuthComponent, LoginComponent, NotFoundComponent ],
  imports: [
    RouterModule.forRoot(routes),
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatListModule,
    MatSliderModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
