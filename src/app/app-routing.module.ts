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
import {OrganizationResolverService} from './services/organization-resolver.service';


const routes: Routes = [
  { path: '', redirectTo: 'Login', pathMatch: 'full' },
  { path: 'Login', component: LoginComponent},
  { path: 'Reset', component: ResetPasswordComponent},
  { path: 'Content-panel', component: ControlPanelComponent, resolve: { orgs: OrganizationResolverService }, /*, canActivate: [AuthGuardService]*/
    children: [
      { path: '', redirectTo: 'Panel', pathMatch: 'full' },
      { path: 'Panel', component: ContentComponent, resolve: { orgs: OrganizationResolverService },
        children : [
          { path: '', redirectTo: 'Home page', resolve: { orgs: OrganizationResolverService }, pathMatch: 'full' },
          { path: 'Home page', component: ContentHomeComponent, resolve: { orgs: OrganizationResolverService }},
          { path: 'Tracciamento', component: ContentTrackUsersComponent, resolve: { orgs: OrganizationResolverService }},
          { path: 'Monitoraggio utenti', component: ContentTrackUsersNumberComponent},
          { path: 'Informazioni sull\'organizzazione', component: ContentTrackUsersGeneralInformationComponent},
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

