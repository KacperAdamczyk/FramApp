import { TestBed, async, inject } from '@angular/core/testing';

import { AdminAuthGuard } from './admin-auth.guard';

import { UserAuthService } from './user-auth.service'
import { FakeUserAuthService } from '../testing/FakeUserAuthService'

describe('AdminAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AdminAuthGuard,
        {provide: UserAuthService, useClass: FakeUserAuthService}
      ],
    });
  });

  it('should be truthy', inject([AdminAuthGuard], (guard: AdminAuthGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should work', inject([AdminAuthGuard], (guard: AdminAuthGuard) => {
    expect(guard.canActivate(null, null)).toBeTruthy();
  }));
});
