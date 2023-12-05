import { TestBed } from '@angular/core/testing';

import { MechandiseService } from './mechandise.service';

describe('MechandiseService', () => {
  let service: MechandiseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MechandiseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
