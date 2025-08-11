import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Declare the components below for routing
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';
import { bodyGuard } from './guards/body.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login',component: LoginComponent},
  {path: 'dashboard',component: DashboardComponent, canActivate: [bodyGuard]},
  {path: 'view-profile',component: ViewProfileComponent,canActivate: [bodyGuard]}, // legacy method: view-profile/:id
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
