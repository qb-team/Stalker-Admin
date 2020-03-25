import { TestBed } from '@angular/core/testing';

import { AuthenticationServiceMockReturnsTrueService } from './authentication-service-mock-returns-true.service';

describe('AuthenticationServiceMockService', () => {
  let service: AuthenticationServiceMockReturnsTrueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationServiceMockReturnsTrueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
