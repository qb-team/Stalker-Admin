import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './UserNoAuthenticated/login/login.component';
import {ResetPasswordComponent} from './UserNoAuthenticated/reset-password/reset-password.component';
import {ControlPanelComponent} from './control-panel.component';
import {NgModule} from '@angular/core';
import {AuthGuardService} from './services/auth-guard.service';
import {OrganizationInformationContentComponent} from './Organization/Organization-information/Organization-information/organization-information-content.component';
import {ViewOrganizationTrackingAreaContentComponent} from './Organization/Organization-tracking-perimeter/View-organization-tracking-area/view-organization-tracking-area-content.component';
import {HomePageContentComponent} from './Home-page/home-page-content.component';
import {ContentComponent} from './content/content.component';
import {OrganizationPresenceNumberComponent} from './Tracking/AnonymousTracking/OrganizationPresenceNumber/organization-presence-number.component';
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
          { path: 'Tracciamento', component: ViewOrganizationTrackingAreaContentComponent},
          { path: 'Monitoraggio utenti', component: OrganizationPresenceNumberComponent, data: { reuse: false}},
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
