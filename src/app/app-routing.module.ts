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
import {AuthenticatedUserAccessesComponent} from './Tracking/AuthenticatedUsersAccesses/authenitcated-user-accesses/authenticated-user-accesses.component';
import {OwnerGuardService} from "./services/owner-guard.service";
import {ManagerGuardService} from "./services/manager-guard.service";
import {AuthenticatedOrganizationGuardService} from "./services/authenticated-organization-guard.service";
import {TimeReportComponent} from "./Tracking/AuthenticatedUsersAccesses/time-report/time-report.component";



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
          { path: 'Perimetro_di_tracciamento_dell\'organizzazione', component: ViewOrganizationTrackingAreaContentComponent, data: { reuse: false}},
          { path: 'Modifica_del_perimetro_di_tracciamento_dell\'organizzazione', component: ModifyOrganizationTrackingAreaContentComponent, canActivate: [ManagerGuardService]},
          { path: 'Presenze_attuali_nell\'organizzazione', component: OrganizationPresenceNumberComponent, data: { reuse: false}},
          { path: 'Informazioni_sull\'organizzazione', component: OrganizationInformationContentComponent, data: { reuse: false}},
          { path: 'Crea_un_amministratore', component: CreateAdministratorComponent, data: { reuse: false},  canActivate: [OwnerGuardService]},
          { path: 'Associa_un_amministratore', component: BindAdministratorComponent, data: { reuse: false}, canActivate: [OwnerGuardService]},
          { path: 'Rimuovi_o_modifica_i_privilegi_degli_amminstratori', component: AdministratorManagementComponent, data: { reuse: false}, canActivate: [OwnerGuardService], canDeactivate: [DeactivateGuard]},
          { path: 'Gestione_dell\'organizzazione', component: OrganizationManagementContentComponent, canActivate: [ManagerGuardService]},
          { path: 'Modifica_del_perimetro_di_tracciamento_di_un_luogo_dell\'organizzazione', component:  ModifyPlaceTrackingAreaContentComponent, canActivate: [ManagerGuardService]},
          { path: 'Gestione_dei_luoghi_di_tracciamento', component: PlaceManagementContentComponent, canActivate: [ManagerGuardService]},
          { path: 'Presenze_attuali_in_un_luogo', component: PlacePresenceNumberComponent, data: { reuse: false}},
          { path: 'Ricerca_accessi_degli_utenti_autenticati', component: AuthenticatedUserAccessesComponent, data: { reuse: false}, canActivate: [AuthenticatedOrganizationGuardService]},
          { path: 'Report_tabellari_sul_tempo_trascorso', component: TimeReportComponent, data: { reuse: false}, canActivate: [AuthenticatedOrganizationGuardService]}
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
