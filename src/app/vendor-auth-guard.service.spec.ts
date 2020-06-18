import { TestBed } from '@angular/core/testing';

import { VendorAuthGuard} from './vendor-auth-guard.service';

describe('VendorAuthGuardService', () => {
  let service: VendorAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendorAuthGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
