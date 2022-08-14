import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvGapYearComponent } from './cv-gap-year.component';

describe('CvGapYearComponent', () => {
  let component: CvGapYearComponent;
  let fixture: ComponentFixture<CvGapYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CvGapYearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CvGapYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
