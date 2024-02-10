import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {JwtHelperService} from "@auth0/angular-jwt";

describe('AuthService', () => {
  let service: AuthService;
  let jwtHelper: jasmine.SpyObj<JwtHelperService>;
  const token = "eyJhbGciOiJSUzI1NiJ9.eyJhdWQiOlsidGVzdDAwMSJdLCJleHAiOjE3MDU3NzEzMjgsImlhdCI6MTcwNTUxMjEyOH0.fQEcceQHVaxSddCD7w_rRcT_fs_0w0ODy1OdKZprk2oOhLx8qBgzb_eZ_c0rm2eKAHdkq879TYzZlSHGKcohv-AzBE7U5zdHzziF3AMX0_K0r9iKSbuy9O2vFO5xTuWZ4khd6npRaSDf7tA1cicDQgaQVlaNyTvI8F7ungi5Zj7my95pBPZzFmtzSHF1uFMmkYswRl1FZiVpTPn8kVxtwKL3FEribGfmicpqPD8AJprOz8fHLjsxh0GuefHeWIdgoWKfkntNwIa8VUwFnfgNb9pBMxaK8aHAQzSKMVXlF2-RC_aO6eNoG2GGMH6Rw1EPKl6UifkVAb7DPM_MSt4cBA"


  beforeEach(() => {
    const helperSpy = jasmine.createSpyObj('JwtHelperService', ['isTokenExpired'])
    TestBed.configureTestingModule({
      providers:[ AuthService, { provide: JwtHelperService, useValue: helperSpy }]
    });
    service = TestBed.inject(AuthService);
    jwtHelper = TestBed.inject(JwtHelperService) as jasmine.SpyObj<JwtHelperService>;
  });

  it('AuthService should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get token into local storage', () => {
    service.setToken(token);
    expect(localStorage.getItem("access_token")).withContext("token expected in localstorage").toBe(token);
    expect(service.getToken()).withContext("token expected").toBe(token);
  });

  it('should call helper when get authentication', () => {
    service.isAuthenticated();
    expect(jwtHelper.isTokenExpired).toHaveBeenCalled();
  });
});
