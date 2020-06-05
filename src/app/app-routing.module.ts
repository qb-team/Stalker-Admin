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
import {AdministratorManagementComponent} from './AdminManagement/modifyPermission/administrator-management.component';
import {ModifyOrganizationTrackingAreaContentComponent} from './Organization/Organization-tracking-perimeter/modify-organization-tracking-area-content/modify-organization-tracking-area-content.component';
import {DeactivateGuard} from './services/deactivate.service';
import {CreateAdministratorComponent} from './AdminManagement/createAdministrator/create-administrator.component';
import {OrganizationManagementContentComponent} from './Organization/Organization-information/organization-management-content/organization-management-content.component';
import {ModifyPlaceTrackingAreaContentComponent} from './Organization/Organization-tracking-perimeter/modify-place-tracking-area-content/modify-place-tracking-area-content.component';
import {PlaceManagementContentComponent} from './Organization/Organization-information/place-management-content/place-management-content.component';
import {PlacePresenceNumberComponent} from './Tracking/AnonymousTracking/place-presence-number/place-presence-number.component';
import {BindAdministratorComponent} from './AdminManagement/bind-administrator/bind-administrator.component';
import {AuthenticatedUserAccessesComponent} from './Tracking/AuthenticatedUsersAccesses/authenticated-user-accesses.component';
import {OwnerGuardService} from "./services/owner-guard.service";
import {ManagerGuardService} from "./services/manager-guard.service";
import {AuthenticatedOrganizationGuardService} from "./services/authenticated-organization-guard.service";



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
          { path: 'Perimetro di tracciamento dell\'organizzazione', component: ViewOrganizationTrackingAreaContentComponent, data: { reuse: false}},
          { path: 'Modifica del perimetro di tracciamento dell\'organizzazione', component: ModifyOrganizationTrackingAreaContentComponent, canActivate: [ManagerGuardService]},
          { path: 'Presenze attuali nell\'organizzazione', component: OrganizationPresenceNumberComponent, data: { reuse: false}},
          { path: 'Informazioni sull\'organizzazione', component: OrganizationInformationContentComponent, data: { reuse: false}},
          { path: 'Crea un amministratore', component: CreateAdministratorComponent, data: { reuse: false},  canActivate: [OwnerGuardService]},
          { path: 'Associa un amministratore', component: BindAdministratorComponent, data: { reuse: false}, canActivate: [OwnerGuardService]},
          { path: 'Rimuovi o modifica i privilegi degli amminstratori', component: AdministratorManagementComponent, data: { reuse: false}, canActivate: [OwnerGuardService], canDeactivate: [DeactivateGuard]},
          { path: 'Gestione dell\'organizzazione', component: OrganizationManagementContentComponent, canActivate: [ManagerGuardService]},
          { path: 'Modifica del perimetro di tracciamento di un luogo dell\'organizzazione', component:  ModifyPlaceTrackingAreaContentComponent, canActivate: [ManagerGuardService]},
          { path: 'Gestione dei luoghi di tracciamento', component: PlaceManagementContentComponent, canActivate: [ManagerGuardService]},
          { path: 'Presenze attuali in un luogo', component: PlacePresenceNumberComponent, data: { reuse: false}},
          { path: 'Ricerca accessi degli utenti autenticati', component: AuthenticatedUserAccessesComponent, data: { reuse: true}, canActivate: [AuthenticatedOrganizationGuardService]}
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
