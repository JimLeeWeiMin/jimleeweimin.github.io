import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-drawing-canvas',
  templateUrl: './drawing-canvas.component.html',
  styleUrls: ['./drawing-canvas.component.css']
})

export class DrawingCanvasComponent implements OnInit {
  // Canvas to draw on
  private ctx!: CanvasRenderingContext2D;

  // Targets the canvas that is inside the div
  @ViewChild('canvasEl') 
  private canvasEl: ElementRef = {} as ElementRef;

  // Refer to the div that holds the canvas
  @ViewChild('MyDivCanvas')
  private myIdentifer: ElementRef = {} as ElementRef;

  // Flag to start the drag recording for canvas
  private mouseDownFlag = false;
  // Flag to start the drag recording for colorpicker
  private mouseDownCPFlag = false;
  // Flag to start the drag recording for gray gradient
  private mouseDownGrayFlag = false;

  // Drawing Canvas Color
  private currentColor: string = "rgb(255,0,0)";
  private prevColor: string = "rgb(255,0,0)";

  // Drawing Canvas Attributes
  private PixelSizeX: number = 25;
  private PixelSizeY: number = 25;

  // Record last picking for the case where user select the multi color
  private lastX: number = 0;
  private lastY: number = 0;

  // Color Selected
  private ctxColorSelected!: CanvasRenderingContext2D;

  @ViewChild('divCanvasColorSelected')
  private myDivCanvasColorSelected: ElementRef = {} as ElementRef;

  @ViewChild('canvasColorSelected')
  private myCanvasColorSelected: ElementRef = {} as ElementRef;

  // Color Gradient
  private ctxColorGradientSelector!: CanvasRenderingContext2D;

  @ViewChild('divCanvasColorGradientSelector')
  private myDivCanvasColorGradientSelected: ElementRef = {} as ElementRef;

  @ViewChild('canvasColorGradientSelector')
  private myCanvasColorGradientSelected: ElementRef = {} as ElementRef;

  //MultiColor
  private ctxMultiColor!: CanvasRenderingContext2D;
  
  private myGradientColor!: CanvasGradient;
  

  @ViewChild('divCanvasMultiColor')
  private myDivCanvasMultiColor: ElementRef = {} as ElementRef;

  @ViewChild('canvasMultiColor')
  private myCanvasMultiColor: ElementRef = {} as ElementRef;

  @ViewChild('divSwatchesBack')
  private mySwatchesBack: ElementRef = {} as ElementRef;

  @HostListener('document:keypress', ['$event'])
  HandleKeyBoardEvent(evt: KeyboardEvent) {

    //Swap the swatches
    if(evt.key === 'x')
    {
      // Grab the previous color
      this.prevColor = this.currentColor;
      // Set the current color
      this.currentColor = getComputedStyle(this.mySwatchesBack.nativeElement).backgroundColor;

      // Draw the SwatchesBack color
      this.mySwatchesBack.nativeElement.style.backgroundColor = this.prevColor;

      // Draw the SwatchesFront color
      this.ctxColorSelected.fillStyle = this.currentColor;
      this.ctxColorSelected.fillRect(0, 0, this.ctxColorSelected.canvas.width, this.ctxColorSelected.canvas.height);
    
      // Set current color
      this.ctx.fillStyle = this.currentColor;
    }

  }

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // Init the Canvas

    // Drawing block
    this.ctx = this.InitCanvas(this.ctx, this.myIdentifer, this.canvasEl);
    // Multi Color for the bottom wrapper
    this.ctxMultiColor = this.InitCanvas(this.ctxMultiColor, this.myDivCanvasMultiColor, this.myCanvasMultiColor);
    // Color selector
    this.ctxColorSelected = this.InitCanvas(this.ctxColorSelected, this.myDivCanvasColorSelected, this.myCanvasColorSelected);
    // Color gradient
    this.ctxColorGradientSelector = this.InitCanvas(this.ctxColorGradientSelector, this.myDivCanvasColorGradientSelected, this.myCanvasColorGradientSelected);
    
    // Set the drawing color to the same as current color
    this.ctx.fillStyle = this.currentColor;
    
    // Draw current selected color
    this.ctxColorSelected.fillStyle = this.currentColor;
    this.ctxColorSelected.fillRect(0, 0, this.ctxColorSelected.canvas.width, this.ctxColorSelected.canvas.height);

    // Color the multi color
    let grad = this.ctxMultiColor.createLinearGradient(this.ctxMultiColor.canvas.width/2, 0, this.ctxMultiColor.canvas.width/2, this.ctxMultiColor.canvas.height);
    grad.addColorStop(0, "rgb(255,0,0)");
    grad.addColorStop(1/12, "rgb(255,125,0)");
    grad.addColorStop(2/12, "rgb(255,255,0)");
    grad.addColorStop(3/12, "rgb(125,255,0)");
    grad.addColorStop(4/12, "rgb(0,255,0)");
    grad.addColorStop(5/12, "rgb(0,255,125)");
    grad.addColorStop(6/12, "rgb(0,255,255)");
    grad.addColorStop(7/12, "rgb(0,125,255)");
    grad.addColorStop(8/12, "rgb(0,0,255)");
    grad.addColorStop(9/12, "rgb(125,0,255)");
    grad.addColorStop(10/12, "rgb(255,0,255)");
    grad.addColorStop(11/12, "rgb(255,0,125)");
    grad.addColorStop(1, "rgb(255,0,0)");

    // Draw the multi color
    this.ctxMultiColor.fillStyle = grad;
    this.ctxMultiColor.fillRect(0,0, this.ctxMultiColor.canvas.width, this.ctxMultiColor.canvas.height);

    // Shorten the value
    let tX = this.ctxColorGradientSelector.canvas.width;
    let tY = this.ctxColorGradientSelector.canvas.height;

    this.myGradientColor = this.ctxColorGradientSelector.createLinearGradient(0, tY/2, tX, tY/2);

    // Set the gradient color
    this.myGradientColor.addColorStop(0, "rgb(255,255,255)");
    this.myGradientColor.addColorStop(1/2, "rgb(255,0,0)");
    this.myGradientColor.addColorStop(1, "rgb(0,0,0)");

    // Draw the colors
    this.ctxColorGradientSelector.fillStyle = this.myGradientColor;
    this.ctxColorGradientSelector.fillRect(0,0, tX, tY);

    // Set the last picking
    this.lastX = this.ctxColorGradientSelector.canvas.width / 2;
    this.lastY = this.ctxColorGradientSelector.canvas.height / 2;
  }

  InitCanvas( _ctx: CanvasRenderingContext2D,
              _targetDiv: ElementRef,
              _targetCanvas: ElementRef): CanvasRenderingContext2D {
    
    _ctx = _targetCanvas.nativeElement.getContext('2d');
    this.resizeToFit(_ctx, _targetDiv);
    return _ctx;
  }

  DownloadCanvas(): void {
    var canvasDataUrl = this.ctx.canvas.toDataURL().replace(/^data:image\/[^;]*/, 'data:application/octet-stream');
    var link = document.createElement('a');

    link.setAttribute('href', canvasDataUrl);
    link.setAttribute('target', '_blank');
    link.setAttribute('download', "newImage.png");

    link.click();
  }

  ClearCanvas(): void {
    this.ctx.fillStyle = "rgb(255,255,255)";
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.fillStyle = this.currentColor;
  }

  multiColorPickerDown(evt: MouseEvent): void {
    let c:Uint8ClampedArray = this.ctxMultiColor.getImageData(evt.offsetX, evt.offsetY, 1, 1).data;
    this.mouseDownGrayFlag = true;

    // Get the current color
    this.ctxMultiColor.fillStyle = "rgba("+c[0]+","+c[1]+","+c[2]+","+c[3]+")";
    this.myGradientColor = this.ctxColorGradientSelector.createLinearGradient(0, this.ctxColorGradientSelector.canvas.height/2, this.ctxColorGradientSelector.canvas.width, this.ctxColorGradientSelector.canvas.height/2);

    //Add two color
    this.myGradientColor.addColorStop(0, "rgb(255,255,255)");
    this.myGradientColor.addColorStop(0.5, "rgba("+c[0]+","+c[1]+","+c[2]+","+c[3]+")");
    this.myGradientColor.addColorStop(1, "rgb(0,0,0)");

    this.ctxColorGradientSelector.fillStyle = this.myGradientColor;
    this.ctxColorGradientSelector.fillRect(0,0, this.ctxColorGradientSelector.canvas.width, this.ctxColorGradientSelector.canvas.height);
    
    // Set the color gradient
    let tc:Uint8ClampedArray = this.ctxColorGradientSelector.getImageData(this.lastX, this.lastY, 1, 1).data;

    // Get the current color
    this.ctxColorSelected.fillStyle = "rgba("+tc[0]+","+tc[1]+","+tc[2]+","+tc[3]+")";
    this.ctx.fillStyle = this.ctxColorSelected.fillStyle;

    // Change the color selected
    this.ctxColorSelected.fillRect(0, 0, this.ctxColorSelected.canvas.width, this.ctxColorSelected.canvas.height);
  }

  multiColorPickerMove(evt: MouseEvent): void {
    if(this.mouseDownGrayFlag)
    {
      let c:Uint8ClampedArray = this.ctxMultiColor.getImageData(evt.offsetX, evt.offsetY, 1, 1).data;

      // Get the current color
      this.ctxMultiColor.fillStyle = "rgba("+c[0]+","+c[1]+","+c[2]+","+c[3]+")";
      this.myGradientColor = this.ctxColorGradientSelector.createLinearGradient(0, this.ctxColorGradientSelector.canvas.height/2, this.ctxColorGradientSelector.canvas.width, this.ctxColorGradientSelector.canvas.height/2);

      //Add two color
      this.myGradientColor.addColorStop(0, "rgb(255,255,255)");
      this.myGradientColor.addColorStop(0.5, "rgba("+c[0]+","+c[1]+","+c[2]+","+c[3]+")");
      this.myGradientColor.addColorStop(1, "rgb(0,0,0)");

      this.ctxColorGradientSelector.fillStyle = this.myGradientColor;
      this.ctxColorGradientSelector.fillRect(0,0, this.ctxColorGradientSelector.canvas.width, this.ctxColorGradientSelector.canvas.height);

      // Set the color gradient
      let tc:Uint8ClampedArray = this.ctxColorGradientSelector.getImageData(this.lastX, this.lastY, 1, 1).data;

      // Get the current color
      this.ctxColorSelected.fillStyle = "rgba("+tc[0]+","+tc[1]+","+tc[2]+","+tc[3]+")";
      this.ctx.fillStyle = this.ctxColorSelected.fillStyle;

      // Change the color selected
      this.ctxColorSelected.fillRect(0, 0, this.ctxColorSelected.canvas.width, this.ctxColorSelected.canvas.height);
    }

    
  }

  multiColorPickerUp(evt: MouseEvent): void {
    this.mouseDownGrayFlag = false;

    let c:Uint8ClampedArray = this.ctxMultiColor.getImageData(evt.offsetX, evt.offsetY, 1, 1).data;

    // Get the current color
    this.ctxMultiColor.fillStyle = "rgba("+c[0]+","+c[1]+","+c[2]+","+c[3]+")";
    this.myGradientColor = this.ctxColorGradientSelector.createLinearGradient(0, this.ctxColorGradientSelector.canvas.height/2, this.ctxColorGradientSelector.canvas.width, this.ctxColorGradientSelector.canvas.height/2);

    //Add two color
    this.myGradientColor.addColorStop(0, "rgb(255,255,255)");
    this.myGradientColor.addColorStop(0.5, "rgba("+c[0]+","+c[1]+","+c[2]+","+c[3]+")");
    this.myGradientColor.addColorStop(1, "rgb(0,0,0)");

    this.ctxColorGradientSelector.fillStyle = this.myGradientColor;
    this.ctxColorGradientSelector.fillRect(0,0, this.ctxColorGradientSelector.canvas.width, this.ctxColorGradientSelector.canvas.height);

    // Set the color gradient
    let tc:Uint8ClampedArray = this.ctxColorGradientSelector.getImageData(this.lastX, this.lastY, 1, 1).data;

    // Get the current color
    this.ctxColorSelected.fillStyle = "rgba("+tc[0]+","+tc[1]+","+tc[2]+","+tc[3]+")";
    this.ctx.fillStyle = this.ctxColorSelected.fillStyle;

    // Change the color selected
    this.ctxColorSelected.fillRect(0, 0, this.ctxColorSelected.canvas.width, this.ctxColorSelected.canvas.height);
  }

  resizeToFit(_ctx: CanvasRenderingContext2D, _DivCtx: ElementRef<HTMLInputElement>): void {
    _ctx.canvas.style.width = '100%';
    _ctx.canvas.style.height = '100%';

    _ctx.canvas.width = _DivCtx.nativeElement.offsetWidth;
    _ctx.canvas.height = _DivCtx.nativeElement.offsetHeight;
  }

  colorPickerDown(evt: MouseEvent): void {
    let c:Uint8ClampedArray = this.ctxColorGradientSelector.getImageData(evt.offsetX, evt.offsetY, 1, 1).data;

    //Set the last x and y
    this.lastX = evt.offsetX;
    this.lastY = evt.offsetY;
    
    this.mouseDownCPFlag = true;

    // Get the current color
    this.ctxColorSelected.fillStyle = "rgba("+c[0]+","+c[1]+","+c[2]+","+c[3]+")";
    this.ctx.fillStyle = this.ctxColorSelected.fillStyle;

    // Change the color selected
    this.ctxColorSelected.fillRect(0, 0, this.ctxColorSelected.canvas.width, this.ctxColorSelected.canvas.height);
  }

  colorPickerUp(evt: MouseEvent): void {
    let c:Uint8ClampedArray = this.ctxColorGradientSelector.getImageData(evt.offsetX, evt.offsetY, 1, 1).data;
    
    //Set the last x and y
    this.lastX = evt.offsetX;
    this.lastY = evt.offsetY;

    this.mouseDownCPFlag = false;

    // Get the current color
    this.ctxColorSelected.fillStyle = "rgba("+c[0]+","+c[1]+","+c[2]+","+c[3]+")";
    this.ctx.fillStyle = this.ctxColorSelected.fillStyle;
    this.currentColor = this.ctxColorSelected.fillStyle;

    // Change the color selected
    this.ctxColorSelected.fillRect(0, 0, this.ctxColorSelected.canvas.width, this.ctxColorSelected.canvas.height);
  }

  colorPickerMove(evt: MouseEvent): void {

    if(this.mouseDownCPFlag) {
      let c:Uint8ClampedArray = this.ctxColorGradientSelector.getImageData(evt.offsetX, evt.offsetY, 1, 1).data;

      //Set the last x and y
      this.lastX = evt.offsetX;
      this.lastY = evt.offsetY;

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
