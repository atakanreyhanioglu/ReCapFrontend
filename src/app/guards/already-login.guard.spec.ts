import { TestBed } from '@angular/core/testing';

import { AlreadyLoginGuard } from './already-login.guard';

describe('AlreadyLoginGuard', () => {
  let guard: AlreadyLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AlreadyLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
