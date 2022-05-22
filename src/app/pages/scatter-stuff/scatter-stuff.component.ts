import { ThisReceiver } from '@angular/compiler';
import { Component, ViewChild, ElementRef, AfterViewInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-scatter-stuff',
  templateUrl: './scatter-stuff.component.html',
  styleUrls: ['./scatter-stuff.component.css']
})

export class ScatterStuffComponent implements AfterViewInit {

  //Targets the canvas that is inside the div
  @ViewChild('canvasEl') 
  private canvasEl: ElementRef = {} as ElementRef;

  //Refer to the div that holds the canvas
  @ViewChild('MyParticleCanvas')
  private myIdentifer: ElementRef = {} as ElementRef;

  /** Canvas 2d context */
  private ctx!: CanvasRenderingContext2D;

  //Particle Emitter
  private myPM!: ParticleEmitter;

  //Stores the handle for animation frame
  private animationFrameHandler!: number;

  //Stores the lastTime to calculate deltaTime
  private lastTime: number | null;

  constructor(private _ngZone: NgZone) {
    this.lastTime = null;
  }

  ngAfterViewInit(): void {
    this.ctx = this.canvasEl.nativeElement.getContext('2d');

    //Fit to div
    this.ctx.canvas.style.width = '100%';
    this.ctx.canvas.style.height = '100%';
    this.ctx.canvas.width = this.myIdentifer.nativeElement.offsetWidth;
    this.ctx.canvas.height = this.myIdentifer.nativeElement.offsetHeight;

    //Construct my particle emitter
    this.myPM = new ParticleEmitter(this.ctx, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  ngOnDestory() {
    //Destory the animation frame
    console.log("Destory the animation frame");
    cancelAnimationFrame(this.animationFrameHandler);
  }

  animate(): void {
    //Start the animation frame
    console.log("Animated");
    this.animationFrameHandler = window.requestAnimationFrame(() => this.Update(this.myPM));
  }

  Update(_pm:ParticleEmitter):void {
    //Request to call the function when the next animation frame occur
    window.requestAnimationFrame(() => this.Update(_pm));

    //Update the particle
    _pm.Update()

    //Draw the particle
    _pm.Draw();
  }
}

class Particle {
  //Current position
  posX: number = 0;
  posY: number = 0;

  //Current speed
  velX: number = 0;
  velY: number = 0;

  //Current Size
  size: number = 0;

  //Boundary
  minBoundX: number = 0;
  minBoundY: number = 0;

  maxBoundX: number = 0;
  maxBoundY: number = 0;

  //Calls when particle is constructed
  constructor(_minBoundX: number, _minBoundY: number,
              _maxBoundX: number, _maxBoundY: number,
              _minVel: number, _maxVel: number, _size: number) {
                
                this.posX = Math.floor(Math.random() * _maxBoundX) + _minBoundX;
                this.posY = Math.floor(Math.random() * _maxBoundY) + _minBoundY;

                this.velX = (Math.floor(Math.random() * _maxVel) + _minVel) * (Math.floor(Math.random() * 2) ? 1 : -1);
                this.velY = (Math.floor(Math.random() * _maxVel) + _minVel) * (Math.floor(Math.random() * 2) ? 1 : -1);

                this.minBoundX = _minBoundX;
                this.minBoundY = _minBoundY;

                this.maxBoundX = _maxBoundX;
                this.maxBoundY = _maxBoundY;

                this.size = _size;
  }

  //Updates the current particle location
  Update() : void {

    //Ensure that it is not out of bound
    let tmpX = this.posX + this.velX;
    let tmpY = this.posY + this.velY;

    //If x is out of bound, recalculate the position
    if(tmpX > this.maxBoundX) this.posX = this.minBoundX + (tmpX - this.maxBoundX);
    else if(tmpX < this.minBoundX) this.posX = this.maxBoundX - (this.minBoundX - tmpX);
    else this.posX = tmpX;

    //If y is out of bound, recalculate the position
    if(tmpY > this.maxBoundY) this.posY = this.minBoundY + (tmpY - this.maxBoundY);
    else if(tmpY < this.minBoundY) this.posY = this.maxBoundY - (this.minBoundY - tmpY);
    else this.posY = tmpY;
  }
}

class ParticleEmitter {

  //Maximum number of particle on the screen at any given time
  maxParticle: number = 50;
  //Current number of particle that is alive
  currentParticle: number = 0;
  //Stores all the particle
  arrParticle: Particle[] = [];

  //Stores the min and max position of spawn point
  minBoundX: number = 0;
  minBoundY: number = 0;

  maxBoundX: number = 0;
  maxBoundY: number = 0;

  //Stores the min and max velocity of the particle
  minVelocity: number = 1;
  maxVelocity: number = 3;

  //Store the min and max size of the particle
  minSize: number = 2;
  maxSize: number = 5;


  //Stores the canvas
  ctx!: CanvasRenderingContext2D;

  constructor(_ctx: CanvasRenderingContext2D,_minBoundX: number, _minBoundY: number,
              _maxBoundX: number, _maxBoundY: number) {
                
                //Set the context
                this.ctx = _ctx;

                //Set the boundary
                this.minBoundX = _minBoundX;
                this.minBoundY = _minBoundY;

                this.maxBoundX = _maxBoundX;
                this.maxBoundY = _maxBoundY;

                //Construct the particle
                for(let i = 0; i < this.maxParticle; ++i)
                {
                  this.arrParticle.push(new Particle( this.minBoundX, this.minBoundY,
                                                      this.maxBoundX, this.maxBoundY,
                                                      this.minVelocity, this.maxVelocity,
                                                      Math.floor(Math.random() * this.maxSize) + this.minSize));
                }
  }

  Update(): void {

    //Update the particle
    for(let i = 0; i < this.maxParticle; ++i)
    {
      this.arrParticle[i].Update();
    }
  }

  Draw(): void {

    //Clear the canvas
    this.ctx.clearRect(this.minBoundX,this.minBoundY, this.maxBoundX, this.maxBoundY);

    for(let i = 0; i < this.maxParticle; ++i)
    {
      
      //this.ctx.fillRect(this.arrParticle[i].posX, this.arrParticle[i].posY, 10, 10);

      this.ctx.beginPath();
      
      this.ctx.arc( this.arrParticle[i].posX, this.arrParticle[i].posY,
                    this.arrParticle[i].size, 0, 2 * Math.PI);

      this.ctx.fillStyle = 'rgb(200, 0, 0)';
      this.ctx.fill();
      //this.ctx.stroke();

    }
  }
}