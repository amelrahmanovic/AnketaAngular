import { TestBed } from '@angular/core/testing';

import { UserCatalogSurveryService } from './user-catalog-survery.service';

describe('UserCatalogSurveryService', () => {
  let service: UserCatalogSurveryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserCatalogSurveryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
