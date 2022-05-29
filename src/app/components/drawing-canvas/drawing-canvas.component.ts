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

  //Drawing Canvas Color
  private currentColor: string = "#000000";

  //Drawing Canvas Attributes
  private PixelSizeX: number = 5;
  private PixelSizeY: number = 5;

  //Color Palette
  private ctxColorSelected!: CanvasRenderingContext2D;

  @ViewChild('divCanvasColorSelected')
  private myDivCanvasColorSelected: ElementRef = {} as ElementRef;

  @ViewChild('canvasColorSelected')
  private myCanvasColorSelected: ElementRef = {} as ElementRef;

  private ctxColorGradientSelected!: CanvasRenderingContext2D;

  @ViewChild('divCanvasColorGradientSelector')
  private myDivCanvasColorGradientSelected: ElementRef = {} as ElementRef;

  @ViewChild('canvasColorGradientSelector')
  private myCanvasColorGradientSelected: ElementRef = {} as ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // Canvas
    this.ctx = this.canvasEl.nativeElement.getContext('2d');

    this.resizeToFit(this.ctx, this.myIdentifer);

    // Set the color to black as default
    this.ctx.fillStyle = this.currentColor;

    // Color Picker
    this.ctxColorSelected = this.myCanvasColorSelected.nativeElement.getContext('2d');
    this.ctxColorGradientSelected = this.myCanvasColorGradientSelected.nativeElement.getContext('2d');

    this.resizeToFit(this.ctxColorSelected, this.myDivCanvasColorSelected);
    this.resizeToFit(this.ctxColorGradientSelected, this.myDivCanvasColorGradientSelected);

    // Draw current selected color
    this.ctxColorSelected.fillStyle = this.currentColor;
    this.ctxColorSelected.fillRect(0, 0, this.ctxColorSelected.canvas.width, this.ctxColorSelected.canvas.height);
  }

  resizeToFit(_ctx: CanvasRenderingContext2D, _DivCtx: ElementRef<HTMLInputElement>): void {
    _ctx.canvas.style.width = '100%';
    _ctx.canvas.style.height = '100%';

    _ctx.canvas.width = _DivCtx.nativeElement.offsetWidth;
    _ctx.canvas.height = _DivCtx.nativeElement.offsetHeight;
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
    this.Draw(evt.offsetX, evt.offsetY);
  }

  Draw(_x: number, _y: number):void {
    this.ctx.fillRect(_x, _y, this.PixelSizeX, this.PixelSizeY);
  }
}
