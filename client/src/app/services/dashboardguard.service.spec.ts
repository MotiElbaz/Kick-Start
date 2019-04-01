import { TestBed, inject } from '@angular/core/testing';

import { DashboardguardService } from './dashboardguard.service';

describe('DashboardguardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DashboardguardService]
    });
  });

  it('should be created', inject([DashboardguardService], (service: DashboardguardService) => {
    expect(service).toBeTruthy();
  }));
});
