import { CanDeactivate } from '@angular/router';
import { AdministratorManagementComponent } from '../AdminManagement/modifyPermission/administrator-management.component';

export class DeactivateGuard implements CanDeactivate<AdministratorManagementComponent> {

  canDeactivate(component: AdministratorManagementComponent) {
    return component.canDeactivate();
  }
}
