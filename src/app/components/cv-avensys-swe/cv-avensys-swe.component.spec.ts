import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvAvensysSWEComponent } from './cv-avensys-swe.component';

describe('CvAvensysSWEComponent', () => {
  let component: CvAvensysSWEComponent;
  let fixture: ComponentFixture<CvAvensysSWEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CvAvensysSWEComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CvAvensysSWEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
