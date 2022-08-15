import { Component, OnInit, Input, ViewChild, ElementRef, ViewChildren, QueryList, HostListener } from '@angular/core';

import { faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.css']
})

export class ImageViewerComponent implements OnInit {

  @Input() imageArrInput: Array<string> = [];

  public ImageArr: Array<ImageContainer> = [];
  public LargeImageWidth: number = 0;
  public LargeImageHeight: number = 0;

  @ViewChildren('LargeViewer') 
  private LargeViewerDiv : QueryList<ElementRef> = {} as QueryList<ElementRef>;
  public CurrentLargeViewerIndex: number = 0;

  @ViewChild('LargeViewerContainer')
  private LargeViewerContainerDiv: ElementRef = {} as ElementRef;

  @ViewChild('ButtonLeft')
  private ButtonLeftDiv: ElementRef = {} as ElementRef;

  @ViewChild('ButtonRight')
  private ButtonRightDiv: ElementRef = {} as ElementRef;

  private LargeViewerLength = 0;

  //Icon
  iconArrowLeft = faArrowLeft;
  iconArrowRight = faArrowRight;

  //Throttle the clicks for the arrow left and right
  private isArrowClick: boolean = false;

  // Resize event
  @HostListener('window:resize', ['$event'])
  getScreenSize(e: Event) {
    this.LargeImageHeight = document.getElementsByClassName("LargeViewerContainer")[0].clientHeight;//window.innerHeight * this.HeightScale;
    this.LargeImageWidth = document.getElementsByClassName("LargeViewerContainer")[0].clientWidth;//window.innerWidth;// * this.WidthScale;

    this.SetImageWidth();
  }

  constructor() { }

  ngOnInit(): void {
    let sz: number = this.imageArrInput.length;

    if(sz <= 0) return;
    
    // Collect the input for this component and put them into an array to display in a for loop
    for(let i = 0; i < sz; ++i) {
      this.ImageArr.push(new ImageContainer(this.imageArrInput[i], this.imageArrInput[i].substring(this.imageArrInput[i].lastIndexOf("/")+1)));
    }

    //A copy of Last Url in front, a copy of first url behind
    this.ImageArr.unshift( new ImageContainer(this.imageArrInput[sz-1], this.imageArrInput[sz-1].substring(this.imageArrInput[sz-1].lastIndexOf("/")+1)));
    this.ImageArr.push( new ImageContainer(this.imageArrInput[0], this.imageArrInput[0].substring(this.imageArrInput[0].lastIndexOf("/")+1)) );

    this.LargeImageHeight = document.getElementsByClassName("LargeViewerContainer")[0].clientHeight//window.innerHeight * this.HeightScale;
    this.LargeImageWidth = document.getElementsByClassName("LargeViewerContainer")[0].clientWidth;
  }

  ngAfterViewInit(): void {
    this.SetImageWidth();

    this.LargeViewerLength = this.ImageArr.length;
    this.ClickRight();
  }

  SetImageWidth(): void {
    // Set the css so it will maintain aspect ratio of 4:3
    let tWidth: number = document.getElementsByClassName("LargeViewerContainer")[0].clientWidth;
    let tHeight: number = (tWidth/4) * 3;

    this.LargeImageHeight = tHeight;//window.innerHeight * this.HeightScale;
    this.LargeImageWidth = tWidth;

    let x: number = this.LargeImageWidth;
    let y: number = this.LargeImageHeight;

    this.LargeViewerDiv.forEach(function(val) {
      val.nativeElement.style.Width = x + "px";
      val.nativeElement.style.Height = y + "px";
    });

    // Set button left and right
    let cTop: number = 50;
    if(tWidth <= 600) {
      cTop = 30;
    }
    else if(tWidth <= 1279) {
      cTop = 50;
    }

    this.ButtonLeftDiv.nativeElement.style.fontSize = cTop + "px";
    this.ButtonRightDiv.nativeElement.style.fontSize = cTop + "px";

    this.ButtonLeftDiv.nativeElement.style.top = ((tHeight-cTop)/2) + "px";
    this.ButtonRightDiv.nativeElement.style.top = ((tHeight-cTop)/2) + "px";
  }

  ClickLeft() : void {

    if(this.isArrowClick === false) {
      this.CurrentLargeViewerIndex -= 1;

      let n: number = -this.LargeImageWidth * this.CurrentLargeViewerIndex;
      
      this.LargeViewerDiv.forEach(function(val) {
        val.nativeElement.style.transition = "transform 0.4s ease-in-out";
        val.nativeElement.style.transform = 'translateX('+ (n) +'px)';
      });

      this.isArrowClick = true;
    }

    
    
  }

  LargeViewerTransitionEnd(e: Event): void {
    //If this is the first index, rotate to n-1
    if(this.CurrentLargeViewerIndex === 0) {
      let n: number = -this.LargeImageWidth * this.imageArrInput.length-1;

      this.LargeViewerDiv.forEach(function(val) {
        val.nativeElement.style.transition = "none";
        val.nativeElement.style.transform = 'translateX('+ (n) +'px)';
      })

      this.CurrentLargeViewerIndex = this.LargeViewerLength-2;
    }

    //If this is the n-1, rotate to the index 1
    else if(this.CurrentLargeViewerIndex === this.LargeViewerLength-1) {
      let n: number = -this.LargeImageWidth * 1;

      this.LargeViewerDiv.forEach(function(val) {
        val.nativeElement.style.transition = "none";
        val.nativeElement.style.transform = 'translateX('+ (n) +'px)';
      })

      this.CurrentLargeViewerIndex = 1;
    }

    this.isArrowClick = false;
  }

  ClickRight(): void {

    if(this.isArrowClick === false) {
      this.CurrentLargeViewerIndex += 1;

      let n: number = -this.LargeImageWidth * this.CurrentLargeViewerIndex;
      
      this.LargeViewerDiv.forEach(function(val) {
        val.nativeElement.style.transition = "transform 0.4s ease-in-out";
        val.nativeElement.style.transform = 'translateX('+ (n) +'px)';
      });

      this.isArrowClick = true;
    }

    
  }
}

class ImageContainer {
  imgSrc: string;
  imgAlt: string;

  constructor( is: string, ia: string ) {
    this.imgSrc = is;
    this.imgAlt = ia;
  }

  getSrc(): string {
    return this.imgSrc;
  }

  getAlt(): string {
    return this.imgAlt;
  }

  displayLog(): void {
    console.log("ImageContainer: " + this.imgSrc + " - " + this.imgAlt)
  }
}
