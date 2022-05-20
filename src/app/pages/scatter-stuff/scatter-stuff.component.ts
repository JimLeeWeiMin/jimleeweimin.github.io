import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-scatter-stuff',
  templateUrl: './scatter-stuff.component.html',
  styleUrls: ['./scatter-stuff.component.css']
})

export class ScatterStuffComponent implements AfterViewInit {

  // @ViewChild('myCanvas') canvasEl: ElementRef;
  /** Template reference to the canvas element */
  @ViewChild('canvasEl') 
  private canvasEl: ElementRef = {} as ElementRef;

  /** Canvas 2d context */
  private ctx!: CanvasRenderingContext2D;

  constructor() { }

  ngAfterViewInit(): void {
    this.ctx = this.canvasEl.nativeElement.getContext('2d');
  }

  animate(): void {

    this.ctx.fillStyle = 'rgb(200, 0, 0)';
    this.ctx.fillRect(10, 10, 50, 50);

    this.ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
    this.ctx.fillRect(30, 30, 50, 50);
  }
}