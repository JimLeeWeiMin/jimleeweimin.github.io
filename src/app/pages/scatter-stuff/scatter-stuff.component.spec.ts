import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScatterStuffComponent } from './scatter-stuff.component';

describe('ScatterStuffComponent', () => {
  let component: ScatterStuffComponent;
  let fixture: ComponentFixture<ScatterStuffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScatterStuffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScatterStuffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
