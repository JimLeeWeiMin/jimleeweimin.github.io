import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-pathfinding-maze',
  templateUrl: './pathfinding-maze.component.html',
  styleUrls: ['./pathfinding-maze.component.css']
})
export class PathfindingMazeComponent implements OnInit {

  // @ViewChild('divMazeCanvas')
  // private myDivMazeCanvas: ElementRef = {} as ElementRef;

  @ViewChild('MazeCanvas')
  private myMazeCanvas: ElementRef = {} as ElementRef;

  private myMazeCtx!: CanvasRenderingContext2D;

  private myWidth: number = 1000;
  private myHeight: number = 600;
  private mySquare: number = 50;   // How big each square will be 

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void { 
    //Init the canvas
    this.myMazeCtx = this.myMazeCanvas.nativeElement.getContext('2d');
    this.myMazeCtx.canvas.width = this.myWidth;
    this.myMazeCtx.canvas.height = this.myHeight;

    //Fill the canvas
    this.myMazeCtx.fillStyle = "rgb(255, 203, 199)";
    this.myMazeCtx.fillRect(0,0, this.myWidth, this.myHeight);

    //Init the grid
    this.myMazeCtx.strokeStyle = 'rgb(0, 0, 0)';
    this.myMazeCtx.lineWidth = 1;


    // this.myMazeCtx.moveTo(90, 130);
    // this.myMazeCtx.lineTo(95, 25);
    // this.myMazeCtx.lineTo(150, 80);
    // this.myMazeCtx.lineTo(205, 25);
    // this.myMazeCtx.lineTo(210, 130);
    // this.myMazeCtx.stroke();

    for(let i = 0; i < this.myWidth; i += this.mySquare)
    {
      //Draw width
      this.myMazeCtx.beginPath();
      this.myMazeCtx.moveTo(i, 0);
      this.myMazeCtx.lineTo(i, this.myHeight);
      this.myMazeCtx.stroke();
    }
    
  }



}
