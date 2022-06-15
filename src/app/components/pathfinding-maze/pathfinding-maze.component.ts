import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

enum MazeNodeStatus {
  None = 0,
  Wall,
  Start,
  End,
}

enum MazeActions {
  CreateWall = 0,
  RemoveWall,
}

class MazeNode {

  public mazeStatus: number = MazeNodeStatus.None;

  constructor(_num = MazeNodeStatus.None) {
    this.mazeStatus = _num; 
  }
}

@Component({
  selector: 'app-pathfinding-maze',
  templateUrl: './pathfinding-maze.component.html',
  styleUrls: ['./pathfinding-maze.component.css']
})

export class PathfindingMazeComponent implements OnInit {

  @ViewChild('MazeCanvasBackground')
  private myMazeBackgroundCanvas: ElementRef = {} as ElementRef;

  private myMazeBackgroundCtx!: CanvasRenderingContext2D;

  @ViewChild('MazeCanvas')
  private myMazeCanvas: ElementRef = {} as ElementRef;

  private myMazeCtx!: CanvasRenderingContext2D;

  private myWidth: number = 1000;
  private myHeight: number = 600;
  private mySquare: number = 50;   // How big each square will be 

  // Precompute rows and height
  private myRow: number = this.myHeight/this.mySquare;  
  private myCol: number = this.myWidth/this.mySquare;

  private myArray: Array< Array<MazeNode> >;

  // Mouse Flag
  private mouseDownLeftFlag = false;
  private mouseDownRightFlag = false;

  constructor() {

    //Init the array  
    this.myArray = new Array<Array<MazeNode>>(this.myRow);

    for(let i = 0; i < this.myRow; ++i)
    {
      //Init the col
      this.myArray[i] = new Array<MazeNode>(this.myCol);

      for(let j = 0; j < this.myCol; ++j)
      {
        this.myArray[i][j] = new MazeNode();
      }
    }

    //Debugging
    this.PrintMaze();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void { 
    //Init the background canvas
    this.myMazeBackgroundCtx = this.myMazeBackgroundCanvas.nativeElement.getContext('2d');
    this.myMazeBackgroundCtx.canvas.width = this.myWidth;
    this.myMazeBackgroundCtx.canvas.height = this.myHeight;

    //Fill the canvas
    this.myMazeBackgroundCtx.fillStyle = "rgb(255, 203, 199)";
    this.myMazeBackgroundCtx.fillRect(0,0, this.myWidth, this.myHeight);

    //Init the grid
    this.myMazeBackgroundCtx.strokeStyle = 'rgb(0, 0, 0)';
    this.myMazeBackgroundCtx.lineWidth = 1;

    //Draw width
    for(let i = 0; i < this.myWidth; i += this.mySquare)
    {
      this.myMazeBackgroundCtx.beginPath();
      this.myMazeBackgroundCtx.moveTo(i, 0);
      this.myMazeBackgroundCtx.lineTo(i, this.myHeight);
      this.myMazeBackgroundCtx.stroke();
    }

    //Draw the height
    for(let i = 0; i < this.myHeight; i += this.mySquare)
    {
      this.myMazeBackgroundCtx.beginPath();
      this.myMazeBackgroundCtx.moveTo(0, i);
      this.myMazeBackgroundCtx.lineTo(this.myWidth, i);
      this.myMazeBackgroundCtx.stroke();
    }

    //Init the canvas
    this.myMazeCtx = this.myMazeCanvas.nativeElement.getContext('2d');
    this.myMazeCtx.canvas.width = this.myWidth;
    this.myMazeCtx.canvas.height = this.myHeight;
  }

  CanvasEventHandler(evt: MouseEvent): void {
    evt.preventDefault();
  }

  // Mouse Event
  mouseDown(evt: MouseEvent): void {
    if(evt.button === 0) {
      this.mouseDownLeftFlag = true;
      this.CalculateSelection(evt.offsetX, evt.offsetY, MazeActions.CreateWall);
    }
    else if(evt.button === 2) {
      this.mouseDownRightFlag = true;
      this.CalculateSelection(evt.offsetX, evt.offsetY, MazeActions.RemoveWall);
    }
  }

  mouseMove(evt: MouseEvent): void {
    // Left click
    if(this.mouseDownLeftFlag && evt.button === 0)
    {
      this.CalculateSelection(evt.offsetX, evt.offsetY, MazeActions.CreateWall);
    }

    // Right click
    else if(this.mouseDownRightFlag && evt.button === 2)
    {
      this.CalculateSelection(evt.offsetX, evt.offsetY, MazeActions.RemoveWall);
    }
  }

  mouseUp(evt: MouseEvent): void {
    // Left click
    if(evt.button === 0)
    {
      this.mouseDownLeftFlag = false;
      this.CalculateSelection(evt.offsetX, evt.offsetY, MazeActions.CreateWall);
    }

    // Right click
    else if(evt.button === 2)
    {
      this.mouseDownRightFlag = false;
      this.CalculateSelection(evt.offsetX, evt.offsetY, MazeActions.RemoveWall);
    }
  } 

  CalculateSelection(_x: number, _y: number, stats: MazeActions): void {

    // Get the row and col
    let _col = Math.max(0, Math.min(this.myCol-1, Math.floor(_x / this.mySquare)) );
    let _row = Math.max(0, Math.min(this.myRow-1, Math.floor(_y / this.mySquare)) );

    // Create wall
    if(stats === MazeActions.CreateWall && this.myArray[_row][_col].mazeStatus === MazeNodeStatus.None) {
      this.myArray[_row][_col].mazeStatus = MazeNodeStatus.Wall
      this.DrawWall(_row, _col);
    } // Remove wall
    else if(stats === MazeActions.RemoveWall && this.myArray[_row][_col].mazeStatus === MazeNodeStatus.Wall) {
      this.myArray[_row][_col].mazeStatus = MazeNodeStatus.None
      this.RemoveWall(_row, _col);
    }
  }

  DrawWall(_row: number, _col: number)
  {
    this.myMazeCtx.fillStyle = "rgb(255, 187, 0)";
    this.myMazeCtx.fillRect(_col*this.mySquare, _row*this.mySquare, this.mySquare, this.mySquare);
  }

  RemoveWall(_row: number, _col: number)
  {
    this.myMazeCtx.fillStyle = "rgb(255, 203, 199)";;
    this.myMazeCtx.clearRect(_col*this.mySquare, _row*this.mySquare, this.mySquare, this.mySquare);
  }

  // For debugging
  PrintMaze(): void {

    console.group("PrintMaze");

    for(let i = 0; i < this.myRow; ++i)
    {
      let s: string = "";
      for(let j = 0; j < this.myCol; ++j)
      {
        s += String(this.myArray[i][j].mazeStatus) + " ";
      }
      console.log(s);
    }

    console.groupEnd();
  }

}
