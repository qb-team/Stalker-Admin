import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {ControlPanelComponent} from './control-panel/control-panel.component';
import {NgModule} from '@angular/core';
import {AuthGuardService} from './services/auth-guard.service';


const routes: Routes = [
  { path: '', redirectTo: 'Login', pathMatch: 'full' },
  { path: 'Login', component: LoginComponent},
  { path: 'Reset', component: ResetPasswordComponent},
  { path: 'Content-panel', component: ControlPanelComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

