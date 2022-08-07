import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvTaggerComponent } from './cv-tagger.component';

describe('CvTaggerComponent', () => {
  let component: CvTaggerComponent;
  let fixture: ComponentFixture<CvTaggerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CvTaggerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CvTaggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
