import { TestBed, inject } from '@angular/core/testing';

import { UserAuthService } from './user-auth.service';

import { CoolSessionStorage } from 'angular2-cool-storage'
import { FakeCoolSessionStorege } from '../testing/FakeCoolSessionStorage'

describe('UserAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserAuthService,
        { provide: CoolSessionStorage, useClass: FakeCoolSessionStorege }
      ]
    });
  });

  it('should be created', inject([UserAuthService], (service: UserAuthService) => {
    expect(service).toBeTruthy();
  }));
});
