import {TestBed} from '@angular/core/testing';
import {Injectable} from '@angular/core';

import {PresenceService} from './presence.service';
import {HttpParams} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Configuration} from 'jasmine-spec-reporter/built/configuration';

@Injectable()
class MockHttpClient {
  post() {}
}

@Injectable()
class MockConfiguration {}

fdescribe('PresenceService', () => {
  let service: PresenceService;
  beforeEach(() => {
    const httpParamsStub = () => ({ append: (key, arg) => ({}) });
    const configurationStub = () => ({
      basePath: {},
      encoder: {},
      selectHeaderAccept: httpHeaderAccepts => ({}),
      withCredentials: {}
    });
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PresenceService,
        { provide: HttpParams, useFactory: httpParamsStub },
        { provide: Configuration, useFactory: configurationStub }
      ]
    });
    service = TestBed.inject(PresenceService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  it('should run #undefined()', async () => {
    // TypeError: target[firstKey] is not a function
    //     at Function.merge (C:\Users\feder\Desktop\Stalker-Admin\node_modules\ngentest\src\util.js:150:88)
    //     at Function.merge (C:\Users\feder\Desktop\Stalker-Admin\node_modules\ngentest\src\util.js:176:12)
    //     at FuncTestGen.setPropsOrParams (C:\Users\feder\Desktop\Stalker-Admin\node_modules\ngentest\src\func-test-gen.js:271:14)
    //     at FuncTestGen.setMockData (C:\Users\feder\Desktop\Stalker-Admin\node_modules\ngentest\src\func-test-gen.js:159:12)
    //     at FuncTestGen.setMockData (C:\Users\feder\Desktop\Stalker-Admin\node_modules\ngentest\src\func-test-gen.js:85:12)
    //     at C:\Users\feder\Desktop\Stalker-Admin\node_modules\ngentest\src\func-test-gen.js:137:14
    //     at Array.forEach (<anonymous>)
    //     at FuncTestGen.setMockData (C:\Users\feder\Desktop\Stalker-Admin\node_modules\ngentest\src\func-test-gen.js:134:25)
    //     at C:\Users\feder\Desktop\Stalker-Admin\node_modules\ngentest\src\func-test-gen.js:78:14
    //     at Array.forEach (<anonymous>)
  });
  it('should run #undefined()', async () => {
    // TypeError: target[firstKey] is not a function
    //     at Function.merge (C:\Users\feder\Desktop\Stalker-Admin\node_modules\ngentest\src\util.js:150:88)
    //     at Function.merge (C:\Users\feder\Desktop\Stalker-Admin\node_modules\ngentest\src\util.js:176:12)
    //     at FuncTestGen.setPropsOrParams (C:\Users\feder\Desktop\Stalker-Admin\node_modules\ngentest\src\func-test-gen.js:271:14)
    //     at FuncTestGen.setMockData (C:\Users\feder\Desktop\Stalker-Admin\node_modules\ngentest\src\func-test-gen.js:159:12)
    //     at FuncTestGen.setMockData (C:\Users\feder\Desktop\Stalker-Admin\node_modules\ngentest\src\func-test-gen.js:85:12)
    //     at C:\Users\feder\Desktop\Stalker-Admin\node_modules\ngentest\src\func-test-gen.js:137:14
    //     at Array.forEach (<anonymous>)
    //     at FuncTestGen.setMockData (C:\Users\feder\Desktop\Stalker-Admin\node_modules\ngentest\src\func-test-gen.js:134:25)
    //     at C:\Users\feder\Desktop\Stalker-Admin\node_modules\ngentest\src\func-test-gen.js:78:14
    //     at Array.forEach (<anonymous>)
  });

});
