import { async } from '@angular/core/testing';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { CustomHttpParameterCodec } from './encoder';
describe('CustomHttpParameterCodec', () => {
  let obj;

  beforeEach(() => {
    obj = new CustomHttpParameterCodec();
  });

  it('should run #encodeKey()', async () => {

    obj.encodeKey({});

  });

  it('should run #encodeValue()', async () => {

    obj.encodeValue({});

  });

  it('should run #decodeKey()', async () => {

    obj.decodeKey({});

  });

  it('should run #decodeValue()', async () => {

    obj.decodeValue({});

  });

});
