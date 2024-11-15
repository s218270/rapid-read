import { TestBed } from '@angular/core/testing';

import { ReadingSpeedService } from './reading-speed.service';

describe('ReadingSpeedService', () => {
  let service: ReadingSpeedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReadingSpeedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
