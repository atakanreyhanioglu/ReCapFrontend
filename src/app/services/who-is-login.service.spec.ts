import { TestBed } from '@angular/core/testing';

import { WhoIsLoginService } from './who-is-login.service';

describe('WhoIsLoginService', () => {
  let service: WhoIsLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WhoIsLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
