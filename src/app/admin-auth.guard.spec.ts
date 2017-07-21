import { TestBed, async, inject } from '@angular/core/testing';

import { AdminAuthGuard } from './admin-auth.guard';

import { UserAuthService } from './user-auth.service'
import { FakeUserAuthService } from '../testing/FakeUserAuthService'

describe('AdminAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AdminAuthGuard,
        { provide: UserAuthService, useClass: FakeUserAuthService }
      ],
    });
  });

  it('should ...', inject([AdminAuthGuard], (guard: AdminAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
