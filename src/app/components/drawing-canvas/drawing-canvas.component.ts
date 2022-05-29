import { BLACK_ON_WHITE_CSS_CLASS } from '@angular/cdk/a11y/high-contrast-mode/high-contrast-mode-detector';
import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-drawing-canvas',
  templateUrl: './drawing-canvas.component.html',
  styleUrls: ['./drawing-canvas.component.css']
})
export class DrawingCanvasComponent implements OnInit {

  //Canvas to draw on
  private ctx!: CanvasRenderingContext2D;

  //Targets the canvas that is inside the div
  @ViewChild('canvasEl') 
  private canvasEl: ElementRef = {} as ElementRef;

  //Refer to the div that holds the canvas
  @ViewChild('MyDivCanvas')
  private myIdentifer: ElementRef = {} as ElementRef;

  //Flag to start the drag recording
  private mouseDownFlag = false;

  //Drawing Canvas Attributes
  private PixelSizeX: number = 5;
  private PixelSizeY: number = 5;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.ctx = this.canvasEl.nativeElement.getContext('2d');

    //Fit to div
    this.ctx.canvas.style.width = '100%';
    this.ctx.canvas.style.height = '100%';
    this.ctx.canvas.width = this.myIdentifer.nativeElement.offsetWidth;
    this.ctx.canvas.height = this.myIdentifer.nativeElement.offsetHeight;

    //Set the color to black as default
    this.ctx.fillStyle = "#000000";
  }

  mouseDown(evt: MouseEvent): void {
    this.mouseDownFlag = true;
    this.Draw(evt.offsetX, evt.offsetY);
  }

  mouseMove(evt: MouseEvent): void {
    if(this.mouseDownFlag) {
      this.Draw(evt.offsetX, evt.offsetY);
    }
  }

  mouseUp(evt: MouseEvent): void {
    this.mouseDownFlag = false;
  }

  Draw(_x: number, _y: number):void {
    this.ctx.fillRect(_x, _y, this.PixelSizeX, this.PixelSizeY);
  }
}
