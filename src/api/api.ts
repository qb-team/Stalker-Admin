export * from './access.service';
import { AccessService } from './access.service';
export * from './administrator.service';
import { AdministratorService } from './administrator.service';
export * from './organization.service';
import { OrganizationService } from './organization.service';
export * from './place.service';
import { PlaceService } from './place.service';
export * from './presence.service';
import { PresenceService } from './presence.service';
export * from './report.service';
import { ReportService } from './report.service';
export * from './report.service';
import { AuthenticationServerService } from './authenticationServer.service';
export * from './authenticationServer.service';
export const APIS = [AccessService, AdministratorService, OrganizationService, PlaceService, PresenceService, ReportService];
