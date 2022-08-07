import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvObjectRecognitionComponent } from './cv-object-recognition.component';

describe('CvObjectRecognitionComponent', () => {
  let component: CvObjectRecognitionComponent;
  let fixture: ComponentFixture<CvObjectRecognitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CvObjectRecognitionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CvObjectRecognitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
