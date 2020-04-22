import { async } from '@angular/core/testing';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { DataService } from './data.service';
describe('DataService', () => {
  let obj;

  beforeEach(() => {
    obj = new DataService();
  });

 /* it('should run SetterDeclaration #setOrg', () => {

    obj.setOrg = {};
    expect(obj.getOrganization).toEqual({});

  });

  it('should run SetterDeclaration #setUsersNumber', async () => {

    obj.setUsersNumber = {};
    expect(obj.getUserNumber).toEqual({});

  });

  it('should run SetterDeclaration #setActiveContent', async () => {

    obj.setActiveContent = {};
    expect(obj.getActiveContent).toEqual({});

  });*/

  it('should run GetterDeclaration #getActiveContent', async () => {

    const getActiveContent = obj.getActiveContent;

  });

  it('should run GetterDeclaration #getUsersNumber', async () => {

    const getUsersNumber = obj.getUsersNumber;

  });

  it('should run GetterDeclaration #getOrganization', async () => {

    const getOrganization = obj.getOrganization;

  });

});
