import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogSurveyComponent } from './catalog-survey.component';

describe('CatalogSurveyComponent', () => {
  let component: CatalogSurveyComponent;
  let fixture: ComponentFixture<CatalogSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogSurveyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatalogSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
