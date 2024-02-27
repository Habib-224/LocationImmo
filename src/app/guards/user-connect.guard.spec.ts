import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userConnectGuard } from './user-connect.guard';

describe('userConnectGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userConnectGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
