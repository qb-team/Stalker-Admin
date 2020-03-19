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
import { DataService } from './services/data.service';

import { AppComponent } from './app.component';

/* child component */
import { MenuFunctionalityComponent } from './control-panel/menu-functionality/menu-functionality.component';
import { MenubarComponent } from './control-panel/menubar/menubar.component';
import { ContentComponent } from './control-panel/content/content.component';
import { ContentTrackUsersComponent } from './control-panel/content/content-track-users/content-track-users.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { FooterComponent } from './footer/footer.component';
import { ContentHomeComponent } from './control-panel/content/content-home/content-home.component';
import { ContentTrackUsersNumberComponent } from './control-panel/content/content-track-users/content-track-users-number/content-track-users-number.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { ContentTrackUsersGeneralInformationsComponent } from './control-panel/content/content-track-users/content-track-users-general-informations/content-track-users-general-informations.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuFunctionalityComponent,
    ContentComponent,
    ContentTrackUsersComponent,
    MenubarComponent,
    LoginComponent,
    ResetPasswordComponent,
    FooterComponent,
    ContentHomeComponent,
    ContentTrackUsersNumberComponent,
    ControlPanelComponent,
    ContentTrackUsersGeneralInformationsComponent
  ],
  imports: [
    BrowserModule,
    AngularFireAuthModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthenticationService, DataService, OrganizationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
