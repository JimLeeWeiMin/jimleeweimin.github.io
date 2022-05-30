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

  //Flag to start the drag recording for canvas
  private mouseDownFlag = false;
  //Flag to start the drag recording for colorpicker
  private mouseDownCPFlag = false;

  //Drawing Canvas Color
  private currentColor: string = "rgb(0,0,0)";

  //Drawing Canvas Attributes
  private PixelSizeX: number = 25;
  private PixelSizeY: number = 25;

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

    // Draw the gradient

    // Calculate the value
    let tX = this.ctxColorGradientSelected.canvas.width;
    let tY = this.ctxColorGradientSelected.canvas.height;

    var gradient = this.ctxColorGradientSelected.createConicGradient(0, tX/2, tY/2);

    //Add two color
    gradient.addColorStop(0, "rgb(255,0,0)");
    gradient.addColorStop(1/12, "rgb(255,125,0)");
    gradient.addColorStop(2/12, "rgb(255,255,0)");
    gradient.addColorStop(3/12, "rgb(125,255,0)");
    gradient.addColorStop(4/12, "rgb(0,255,0)");
    gradient.addColorStop(5/12, "rgb(0,255,125)");
    gradient.addColorStop(6/12, "rgb(0,255,255)");
    gradient.addColorStop(7/12, "rgb(0,125,255)");
    gradient.addColorStop(8/12, "rgb(0,0,255)");
    gradient.addColorStop(9/12, "rgb(125,0,255)");
    gradient.addColorStop(10/12, "rgb(255,0,255)");
    gradient.addColorStop(11/12, "rgb(255,0,125)");
    gradient.addColorStop(1, "rgb(255,0,0)");

    this.ctxColorGradientSelected.fillStyle = gradient;
    this.ctxColorGradientSelected.fillRect(0,0, tX, tY);
  }

  resizeToFit(_ctx: CanvasRenderingContext2D, _DivCtx: ElementRef<HTMLInputElement>): void {
    _ctx.canvas.style.width = '100%';
    _ctx.canvas.style.height = '100%';

    _ctx.canvas.width = _DivCtx.nativeElement.offsetWidth;
    _ctx.canvas.height = _DivCtx.nativeElement.offsetHeight;
  }

  colorPickerDown(evt: MouseEvent): void {
    let c:Uint8ClampedArray = this.ctxColorGradientSelected.getImageData(evt.offsetX, evt.offsetY, 1, 1).data;
    
    this.mouseDownCPFlag = true;

    // Get the current color
    this.ctxColorSelected.fillStyle = "rgba("+c[0]+","+c[1]+","+c[2]+","+c[3]+")";
    this.ctx.fillStyle = this.ctxColorSelected.fillStyle;

    // Change the color selected
    this.ctxColorSelected.fillRect(0, 0, this.ctxColorSelected.canvas.width, this.ctxColorSelected.canvas.height);
  }

  colorPickerUp(evt: MouseEvent): void {
    let c:Uint8ClampedArray = this.ctxColorGradientSelected.getImageData(evt.offsetX, evt.offsetY, 1, 1).data;
    
    this.mouseDownCPFlag = false;

    // Get the current color
    this.ctxColorSelected.fillStyle = "rgba("+c[0]+","+c[1]+","+c[2]+","+c[3]+")";
    this.ctx.fillStyle = this.ctxColorSelected.fillStyle;

    // Change the color selected
    this.ctxColorSelected.fillRect(0, 0, this.ctxColorSelected.canvas.width, this.ctxColorSelected.canvas.height);
  }

  colorPickerMove(evt: MouseEvent): void {

    if(this.mouseDownCPFlag) {
      let c:Uint8ClampedArray = this.ctxColorGradientSelected.getImageData(evt.offsetX, evt.offsetY, 1, 1).data;

      // Get the current color
      this.ctxColorSelected.fillStyle = "rgba("+c[0]+","+c[1]+","+c[2]+","+c[3]+")";
      this.ctx.fillStyle = this.ctxColorSelected.fillStyle;

      // Change the color selected
      this.ctxColorSelected.fillRect(0, 0, this.ctxColorSelected.canvas.width, this.ctxColorSelected.canvas.height);
    }
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
