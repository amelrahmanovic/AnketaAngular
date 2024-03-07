import { TestBed } from '@angular/core/testing';

import { CatalogSurveyService } from './catalog-survey.service';

describe('CatalogSurveyService', () => {
  let service: CatalogSurveyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatalogSurveyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
