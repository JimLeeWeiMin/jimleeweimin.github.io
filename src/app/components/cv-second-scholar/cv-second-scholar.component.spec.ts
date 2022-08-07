import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvSecondScholarComponent } from './cv-second-scholar.component';

describe('CvSecondScholarComponent', () => {
  let component: CvSecondScholarComponent;
  let fixture: ComponentFixture<CvSecondScholarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CvSecondScholarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CvSecondScholarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
