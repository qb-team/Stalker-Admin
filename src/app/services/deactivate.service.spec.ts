import {DeactivateGuard} from './deactivate.service';

describe('DeactivateGuard', () => {
  let obj;

  beforeEach(() => {
    obj = new DeactivateGuard();
  });

  it('should run #canDeactivate()', async () => {

    obj.canDeactivate({
      canDeactivate() {}
    });

  });

});
