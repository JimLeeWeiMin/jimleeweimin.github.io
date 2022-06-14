import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PathfindingMazeComponent } from './pathfinding-maze.component';

describe('PathfindingMazeComponent', () => {
  let component: PathfindingMazeComponent;
  let fixture: ComponentFixture<PathfindingMazeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PathfindingMazeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PathfindingMazeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
