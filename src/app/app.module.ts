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
import { MenuFunctionalityComponent } from './control-panel/menu-functionality/menu-functionality.component';
import { MenubarComponent } from './control-panel/menubar/menubar.component';
import { ContentComponent } from './control-panel/content/content.component';
import { OrganizationTrackingAreaContentComponent } from './control-panel/content/content-track-users/organization-tracking-area-content.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { FooterComponent } from './footer/footer.component';
import { HomePageContentComponent } from './control-panel/content/content-home/home-page-content.component';
import { ContentTrackUsersNumberComponent } from './control-panel/content/content-home/user-tracking-content/content-track-users-number/content-track-users-number.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { OrganizationInformationContentComponent } from './control-panel/content/content-home/user-tracking-content/organization-information-content/organization-information-content.component';
import {AppRoutingModule} from './app-routing.module';
import {RouteReuseStrategy} from '@angular/router';
import {RouteReuseService} from './services/route-reuse.service';
import { ManageAdministratorsContentComponent } from './control-panel/content/manage-administrators-content/manage-administrators-content.component';
import {AdministratorDataService} from './services/AdministratorData.service';
import {AccessDataService} from './services/AccessesData.service';
import {OrganizationTrackingDataService} from './services/OrganizationTrackingData.service';


@NgModule({
  declarations: [
    AppComponent,
    MenuFunctionalityComponent,
    ContentComponent,
    OrganizationTrackingAreaContentComponent,
    LoginComponent,
    ResetPasswordComponent,
    FooterComponent,
    HomePageContentComponent,
    ContentTrackUsersNumberComponent,
    ControlPanelComponent,
    OrganizationInformationContentComponent,
    MenubarComponent,
    ManageAdministratorsContentComponent
  ],
  imports: [
    BrowserModule,
    AngularFireAuthModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [AuthenticationService, OrganizationService, AdministratorDataService, AccessDataService, OrganizationTrackingDataService, { provide: RouteReuseStrategy, useClass: RouteReuseService }],
  bootstrap: [AppComponent]
})
export class AppModule { }
