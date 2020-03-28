import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login.component';
import {ResetPasswordComponent} from '../reset-password/reset-password.component';
import {ControlPanelComponent} from '../control-panel/control-panel.component';


export const LoginRoutes: Routes = [
  { path: 'Reset', component: ResetPasswordComponent},
  { path: 'Content-panel', component: ControlPanelComponent }
];

