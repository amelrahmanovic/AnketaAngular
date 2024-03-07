import { TestBed } from '@angular/core/testing';

import { CatalogSurveyQuestionService } from './catalog-survey-question.service';

describe('CatalogSurveyQuestionService', () => {
  let service: CatalogSurveyQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatalogSurveyQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
