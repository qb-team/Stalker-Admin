import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {ControlPanelComponent} from './control-panel/control-panel.component';
import {NgModule} from '@angular/core';
import {AuthGuardService} from './services/auth-guard.service';
import {OrganizationInformationContentComponent} from './control-panel/content/content-home/user-tracking-content/organization-information-content/organization-information-content.component';
import {OrganizationTrackingAreaContentComponent} from './control-panel/content/content-track-users/organization-tracking-area-content.component';
import {HomePageContentComponent} from './control-panel/content/content-home/home-page-content.component';
import {ContentComponent} from './control-panel/content/content.component';
import {ContentTrackUsersNumberComponent} from './control-panel/content/content-home/user-tracking-content/content-track-users-number/content-track-users-number.component';
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
          { path: 'Homepage', component: HomePageContentComponent},
          { path: 'Tracciamento', component: OrganizationTrackingAreaContentComponent},
          { path: 'Monitoraggio utenti', component: ContentTrackUsersNumberComponent, data: { reuse: false}},
          { path: 'Informazioni sull\'organizzazione', component: OrganizationInformationContentComponent, data: { reuse: true}},
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
