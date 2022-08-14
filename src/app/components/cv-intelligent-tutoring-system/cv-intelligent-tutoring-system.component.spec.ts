import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvIntelligentTutoringSystemComponent } from './cv-intelligent-tutoring-system.component';

describe('CvIntelligentTutoringSystemComponent', () => {
  let component: CvIntelligentTutoringSystemComponent;
  let fixture: ComponentFixture<CvIntelligentTutoringSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CvIntelligentTutoringSystemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CvIntelligentTutoringSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
