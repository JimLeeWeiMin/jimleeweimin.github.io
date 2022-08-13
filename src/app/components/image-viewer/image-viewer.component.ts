import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, Input, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.css']
})
export class ImageViewerComponent implements OnInit {

  @Input() imageArrInput: Array<string> = [];
  public ImageArr: Array<ImageContainer> = [];
  public ImageSize: number = 1000;

  @ViewChildren('SmallViewer') 
  private SmallViewerDiv : QueryList<ElementRef> = {} as QueryList<ElementRef>;
  public CurrentSmallViewerIndex: number = 0;

  private SmallViewerLength = 0;

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

    
  }

  ngAfterViewInit(): void {
    this.SmallViewerLength = this.ImageArr.length;
    this.ClickRight();
  }

  ClickLeft() : void {
    this.CurrentSmallViewerIndex -= 1;

    let n: number = -this.ImageSize * this.CurrentSmallViewerIndex;
    
    this.SmallViewerDiv.forEach(function(val) {
      val.nativeElement.style.transition = "transform 0.4s ease-in-out";
      val.nativeElement.style.transform = 'translateX('+ (n) +'px)';
    });
    
  }

  SmallViewerTransitionEnd(e: Event): void {
    //If this is the first index, rotate to n-1
    if(this.CurrentSmallViewerIndex === 0) {
      let n: number = -this.ImageSize * this.imageArrInput.length-1;

      this.SmallViewerDiv.forEach(function(val) {
        val.nativeElement.style.transition = "none";
        val.nativeElement.style.transform = 'translateX('+ (n) +'px)';
      })

      this.CurrentSmallViewerIndex = this.SmallViewerLength-2;
    }

    //If this is the n-1, rotate to the index 1
    else if(this.CurrentSmallViewerIndex === this.SmallViewerLength-1) {
      let n: number = -this.ImageSize * 1;

      this.SmallViewerDiv.forEach(function(val) {
        val.nativeElement.style.transition = "none";
        val.nativeElement.style.transform = 'translateX('+ (n) +'px)';
      })

      this.CurrentSmallViewerIndex = 1;
    }
  }

  ClickRight(): void {
    this.CurrentSmallViewerIndex += 1;

    let n: number = -this.ImageSize * this.CurrentSmallViewerIndex;
    
    this.SmallViewerDiv.forEach(function(val) {
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
