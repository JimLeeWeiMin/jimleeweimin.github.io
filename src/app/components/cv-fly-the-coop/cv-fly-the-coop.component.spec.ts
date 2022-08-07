import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvFlyTheCoopComponent } from './cv-fly-the-coop.component';

describe('CvFlyTheCoopComponent', () => {
  let component: CvFlyTheCoopComponent;
  let fixture: ComponentFixture<CvFlyTheCoopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CvFlyTheCoopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CvFlyTheCoopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
