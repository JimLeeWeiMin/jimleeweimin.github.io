import { Component, ViewChild, ElementRef, AfterViewInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-particle-emitter',
  templateUrl: './particle-emitter.component.html',
  styleUrls: ['./particle-emitter.component.css']
})
export class ParticleEmitterComponent implements AfterViewInit {

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

  //Stores mouse position
  private mosX : number = 0;
  private mosY : number = 0;

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

    // Start the animation
    this.animate();
  }
  getMousePos(evt: MouseEvent) {
    this.mosX = evt.offsetX;
    this.mosY = evt.offsetY;

    //console.log("This fn is called");
    //console.log(evt);
    //console.log("Mouse pos: " + this.mosX + " " +this.mosY);
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
    _pm.Update(this.mosX, this.mosY);

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

  //Additional Speed
  addSpeedX: number = 0;
  addSpeedY: number = 0;

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

                this.velX = ((Math.random() * _maxVel) + _minVel) * (Math.floor(Math.random() * 2) ? 1 : -1);
                this.velY = ((Math.random() * _maxVel) + _minVel) * (Math.floor(Math.random() * 2) ? 1 : -1);

                this.minBoundX = _minBoundX;
                this.minBoundY = _minBoundY;

                this.maxBoundX = _maxBoundX;
                this.maxBoundY = _maxBoundY;

                this.size = _size;
  }

  //Updates the current particle location (mDist is already square)
  Update(mx: number, my: number, mdist: number) : void {

    

    //Get the mouse location
    // let tmpDx = (this.posX - mx); 
    // tmpDx *= tmpDx;
    // let tmpDy = (this.posY - my);
    // tmpDy *- tmpDy;
    // let tmpD = tmpDx + tmpDy;

    // //If its nearby, move the away from the mouse cursor
    // if(tmpD <= mdist) {
    //   // If it is above me
    //   if(this.posY < my)
    //   {
    //     this.posY -= tmpDy;
    //   }
    //   // Else it is below me
    //   else
    //   {
    //     this.posY += tmpDy;
    //   }
      
    //   // If it is on the left
    //   if(this.posX < mx)
    //   {
    //     this.posX -= tmpDx
    //   }
    //   // Else it is on the right
    //   else
    //   {
    //     this.posX += tmpDx; 
    //   }
    // }

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
  minVelocity: number = 0.1;
  maxVelocity: number = 1;

  //Store the min and max size of the particle
  minSize: number = 2;
  maxSize: number = 5;

  //Stores the canvas
  ctx!: CanvasRenderingContext2D;

  // Stores the length of the line
  particleLineLength: number = 100;
  // Not going to square root so going to store the square of length
  sqLength: number = 0;

  // How far the particles is going to move away from the mouse
  particleDisperseLength: number = 30;
  sqParticleDisperseLength: number = 0;


  constructor(_ctx: CanvasRenderingContext2D,_minBoundX: number, _minBoundY: number,
              _maxBoundX: number, _maxBoundY: number) {
                
                //Set the context
                this.ctx = _ctx;

                //Set the boundary
                this.minBoundX = _minBoundX;
                this.minBoundY = _minBoundY;

                this.maxBoundX = _maxBoundX;
                this.maxBoundY = _maxBoundY;

                //Calculate the square length
                this.sqLength = this.particleLineLength * this.particleLineLength;
                this.sqParticleDisperseLength = this.particleDisperseLength * this.particleDisperseLength;
                
                //Construct the particle
                for(let i = 0; i < this.maxParticle; ++i)
                {
                  this.arrParticle.push(new Particle( this.minBoundX, this.minBoundY,
                                                      this.maxBoundX, this.maxBoundY,
                                                      this.minVelocity, this.maxVelocity,
                                                      Math.floor(Math.random() * this.maxSize) + this.minSize));
                }
                
  }

  Update(mx: number, my: number): void {

    //Update the particle
    for(let i = 0; i < this.maxParticle; ++i)
    {
      this.arrParticle[i].Update(mx, my, this.sqParticleDisperseLength);
    }
  }

  Draw(): void {

    // Clear the canvas
    this.ctx.clearRect(this.minBoundX,this.minBoundY, this.maxBoundX, this.maxBoundY);

    for(let i = 0; i < this.maxParticle; ++i)
    {
      this.ctx.beginPath();
      this.ctx.arc( this.arrParticle[i].posX, this.arrParticle[i].posY,
                    this.arrParticle[i].size, 0, 2 * Math.PI);
      this.ctx.fillStyle = 'white';
      this.ctx.fill();

      // Draw the lines to each particles
      for(let j = 0; j < this.maxParticle; ++j)
      {
        // If it is myself, skip
        if(i == j) continue;

        // Calculate the length between two particles
        let x = this.arrParticle[i].posX - this.arrParticle[j].posX;
        let y = this.arrParticle[i].posY - this.arrParticle[j].posY;
        x *= x;
        y *= y;
        let d = x+y;
        
        //Draw the line if it is equal or less
        if(d <= this.sqLength)
        {
          //Calculate the alpha value
          let a = String(1 - (d / this.sqLength));

          this.ctx.strokeStyle = 'rgba(255,255,255,' + a +')';
          this.ctx.lineWidth = 1;
          this.ctx.beginPath();
          this.ctx.moveTo(this.arrParticle[i].posX, this.arrParticle[i].posY);
          this.ctx.lineTo(this.arrParticle[j].posX, this.arrParticle[j].posY);
          this.ctx.stroke();
        }

       
      }


    }
  }
}