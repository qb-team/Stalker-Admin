/*
 * Container of all components
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';

/* service */
import { AuthenticationService } from './services/authentication.service';
import { OrganizationService } from 'src/api/api';

import { AppComponent } from './app.component';

/* child component */
import { MenuFunctionalityComponent } from './menu-functionality/menu-functionality.component';
import { MenubarComponent } from './menubar/menubar.component';
import { ContentComponent } from './content/content.component';
import { ViewOrganizationTrackingAreaContentComponent } from './Organization/Organization-tracking-perimeter/View-organization-tracking-area/view-organization-tracking-area-content.component';
import { LoginComponent } from './UserNoAuthenticated/login/login.component';
import { ResetPasswordComponent } from './UserNoAuthenticated/reset-password/reset-password.component';
import { FooterComponent } from './footer/footer.component';
import { HomePageContentComponent } from './Home-page/home-page-content.component';
import { OrganizationPresenceNumberComponent } from './Tracking/AnonymousTracking/OrganizationPresenceNumber/organization-presence-number.component';
import { ControlPanelComponent } from './control-panel.component';
import { OrganizationInformationContentComponent} from './Organization/Organization-information/Organization-information/organization-information-content.component';
import {AppRoutingModule} from './app-routing.module';
import {RouteReuseStrategy} from '@angular/router';
import {RouteReuseService} from './services/route-reuse.service';
import { AdministratorManagementComponent } from './AdminManagement/administrator-management.component';
import {AdministratorOrganizationDataService} from './services/AdministratorOrganizationData.service';
import {AccessDataService} from './services/AccessesData.service';
import {OrganizationTrackingDataService} from './services/OrganizationTrackingData.service';
import {OsmMapContentComponent} from './Organization/osm-map-content/osm-map-content.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {AdministratorPermissionDataService} from './services/AdministratorPermissionData.service';
import { ModifyOrganizationTrackingAreaContentComponent } from './Organization/Organization-tracking-perimeter/modify-organization-tracking-area-content/modify-organization-tracking-area-content.component';
import {DeactivateGuard} from './services/deactivate.service';
import { OrganizationManagementContentComponent } from './Organization/Organization-tracking-perimeter/organization-management-content/organization-management-content.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuFunctionalityComponent,
    ContentComponent,
    ViewOrganizationTrackingAreaContentComponent,
    LoginComponent,
    ResetPasswordComponent,
    FooterComponent,
    HomePageContentComponent,
    OrganizationPresenceNumberComponent,
    ControlPanelComponent,
    OrganizationInformationContentComponent,
    MenubarComponent,
    AdministratorManagementComponent,
    OsmMapContentComponent,
    ModifyOrganizationTrackingAreaContentComponent,
    OrganizationManagementContentComponent
  ],
  imports: [
    BrowserModule,
    AngularFireAuthModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    LeafletModule
  ],
  providers: [AuthenticationService, DeactivateGuard, OrganizationService, AdministratorOrganizationDataService, AdministratorPermissionDataService, AccessDataService, OrganizationTrackingDataService, { provide: RouteReuseStrategy, useClass: RouteReuseService }],
  bootstrap: [AppComponent]
})
export class AppModule { }
