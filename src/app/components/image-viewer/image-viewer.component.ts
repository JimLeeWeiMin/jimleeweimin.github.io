import { Component, OnInit, Input, ViewChild, ElementRef, ViewChildren, QueryList, HostListener } from '@angular/core';

import { faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.css']
})

export class ImageViewerComponent implements OnInit {

  @Input() imageArrInput: Array<string> = [];
  @Input() largeImageWidthInput: number = 1000;
  @Input() largeImageHeightInput: number = 600;

  public ImageArr: Array<ImageContainer> = [];
  public LargeImageWidth: number = 0;
  public LargeImageHeight: number = 0;

  @ViewChildren('LargeViewer') 
  private LargeViewerDiv : QueryList<ElementRef> = {} as QueryList<ElementRef>;
  public CurrentLargeViewerIndex: number = 0;

  private LargeViewerLength = 0;

  //Icon
  iconArrowLeft = faArrowLeft;
  iconArrowRight = faArrowRight;

  // Resize event
  @HostListener('window:resize', ['$event'])
  getScreenSize(e: Event) {
    this.LargeImageHeight = window.innerHeight * 0.4;
    this.LargeImageWidth = window.innerWidth * 0.6;
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

    //Set the image size
    if(this.largeImageHeightInput != 0)
      this.LargeImageHeight = this.largeImageHeightInput;
    else
      this.LargeImageHeight = window.innerHeight * 0.4;

    if(this.largeImageWidthInput != 0)
      this.LargeImageWidth = this.largeImageWidthInput;
    else
      this.LargeImageHeight = window.innerWidth * 0.6;
  }

  ngAfterViewInit(): void {
    this.LargeViewerLength = this.ImageArr.length;
    this.ClickRight();
  }

  ClickLeft() : void {
    this.CurrentLargeViewerIndex -= 1;

    let n: number = -this.LargeImageWidth * this.CurrentLargeViewerIndex;
    
    this.LargeViewerDiv.forEach(function(val) {
      val.nativeElement.style.transition = "transform 0.4s ease-in-out";
      val.nativeElement.style.transform = 'translateX('+ (n) +'px)';
    });
    
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
  }

  ClickRight(): void {
    this.CurrentLargeViewerIndex += 1;

    let n: number = -this.LargeImageWidth * this.CurrentLargeViewerIndex;
    
    this.LargeViewerDiv.forEach(function(val) {
      val.nativeElement.style.transition = "transform 0.4s ease-in-out";
      val.nativeElement.style.transform = 'translateX('+ (n) +'px)';
    });

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
