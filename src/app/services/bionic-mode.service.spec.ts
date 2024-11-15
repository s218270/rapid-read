import { TestBed } from '@angular/core/testing';

import { BionicModeService } from './bionic-mode.service';

describe('BionicModeService', () => {
  let service: BionicModeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BionicModeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
