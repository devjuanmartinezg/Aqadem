import { TestBed } from '@angular/core/testing';

import { Auth } from './auth.service';
import { beforeEach, describe, it } from 'node:test';

describe('Auth', () => {
  let service: Auth;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Auth);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
