import { TestBed } from '@angular/core/testing';

import { CartGuardGuard } from './cart-guard.guard';

describe('CartGuardGuard', () => {
  let guard: CartGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CartGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
