import { async } from '@angular/core/testing';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { RouteReuseService } from './route-reuse.service';
describe('RouteReuseService', () => {
  let obj;

  beforeEach(() => {
    obj = new RouteReuseService();
  });

  it('should run #shouldDetach()', async () => {

    obj.shouldDetach({
      routeConfig: {
        loadChildren: {},
        data: {
          reuse: {}
        }
      }
    });

  });

  it('should run #store()', async () => {

    obj.store({}, {});

  });

  it('should run #shouldAttach()', async () => {

    obj.shouldAttach({});

  });

  it('should run #retrieve()', async () => {

    obj.retrieve({
      routeConfig: {
        loadChildren: {}
      }
    });

  });

  it('should run #shouldReuseRoute()', async () => {

    obj.shouldReuseRoute({
      routeConfig: {
        data: {
          reuse: {}
        }
      }
    }, {
      routeConfig: {}
    });

  });

  it('should run #getUrl()', async () => {

    obj.getUrl({
      routeConfig: {
        path: {}
      }
    });

  });

});
