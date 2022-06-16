import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  @ViewChild('TabletNavigationWrapper') 
  private myTabletNavigationWrapper: ElementRef = {} as ElementRef;
  private isClick: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  SideNavButtonOnClick(): void {
    if(this.isClick)
    {
      this.isClick = false;
      this.myTabletNavigationWrapper.nativeElement.style.visibility = "hidden";
    }
    else
    {
      this.isClick = true;
      this.myTabletNavigationWrapper.nativeElement.style.visibility = "visible";
      
    }
  }

}
