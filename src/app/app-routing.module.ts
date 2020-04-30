import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {ControlPanelComponent} from './control-panel/control-panel.component';
import {NgModule} from '@angular/core';
import {AuthGuardService} from './services/auth-guard.service';
import {ContentTrackUsersGeneralInformationComponent} from './control-panel/content/content-track-users/content-track-users-general-informations/content-track-users-general-information.component';
import {ContentTrackUsersComponent} from './control-panel/content/content-track-users/content-track-users.component';
import {ContentHomeComponent} from './control-panel/content/content-home/content-home.component';
import {ContentComponent} from './control-panel/content/content.component';
import {ContentTrackUsersNumberComponent} from './control-panel/content/content-track-users/content-track-users-number/content-track-users-number.component';
import {LoginGuardService} from './services/login-guard.service';


const routes: Routes = [
  { path: '', redirectTo: 'Content-panel/Panel/Homepage', pathMatch: 'full'},
  { path: 'Login', component: LoginComponent, canActivate: [LoginGuardService]},
  { path: 'Reset', component: ResetPasswordComponent, canActivate: [LoginGuardService]},
  { path: 'Content-panel', component: ControlPanelComponent, canActivate: [AuthGuardService],
    children: [
      { path: '', redirectTo: 'Panel', pathMatch: 'full' },
      { path: 'Panel', component: ContentComponent,
        children : [
          { path: '', redirectTo: 'Homepage', pathMatch: 'full' },
          { path: 'Homepage', component: ContentHomeComponent},
          { path: 'Tracciamento', component: ContentTrackUsersComponent},
          { path: 'Monitoraggio utenti', component: ContentTrackUsersNumberComponent},
          { path: 'Informazioni sull\'organizzazione', component: ContentTrackUsersGeneralInformationComponent, data: { reuse: true}},
        ]
      }
    ]
  },


];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
