import {DeactivateGuard} from './deactivate.service';

fdescribe('DeactivateGuard', () => {
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
