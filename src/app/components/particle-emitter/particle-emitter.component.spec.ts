import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticleEmitterComponent } from './particle-emitter.component';

describe('ParticleEmitterComponent', () => {
  let component: ParticleEmitterComponent;
  let fixture: ComponentFixture<ParticleEmitterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticleEmitterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticleEmitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
