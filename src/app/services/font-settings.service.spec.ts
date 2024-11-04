import { TestBed } from '@angular/core/testing';

import { FontSettingsService } from './font-settings.service';

describe('FontSettingsService', () => {
  let service: FontSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FontSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
