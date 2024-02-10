import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClient } from "@angular/common/http";
import {of} from "rxjs";

describe('UserService', () => {
  let service: UserService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    service = new UserService(httpClientSpy);
  });

  it('should get token with valid username/password', (done: DoneFn) => {
    httpClientSpy.post.and.returnValue(of({token:"fake_token"}));

    service.loginByUsername("usertest001", "abcd123456").subscribe({
      next: token => {
        expect(token.token).withContext("expected token").toEqual("fake_token");
        done()
      },
      error: err => done.fail,
    });
  });
});
