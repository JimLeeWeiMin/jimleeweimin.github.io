import { Component, OnInit } from '@angular/core';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-scatter-stuff',
  templateUrl: './scatter-stuff.component.html',
  styleUrls: ['./scatter-stuff.component.css']
})

export class ScatterStuffComponent implements OnInit {

  iconArrowDown = faAngleDown;

  num: number = 3;
  currentMax: number = 3;

  name:string = "";

  constructor() {
  }

  ngOnInit(): void {
  }

  myFn(evt: Event): void {
    let userInput = evt as InputEvent;
    console.log(userInput.data);
  }

  selectOnChange(evt: Event): void {
    let res: HTMLOptionsCollection | null = evt.target as unknown as HTMLOptionsCollection;
    this.num = res.selectedIndex+1;
    console.log(this.num);
  }

  clickLeftPage() : void {
    console.log("clickLeftPage");
    if(this.num <= 1) this.num = 1;
    else this.num -= 1;

    console.log(this.num);
  }

  clickRightPage() : void {
    console.log("clickRightPage");
    if(this.num >= this.currentMax) this.num = this.currentMax;
    else this.num += 1;

    console.log(this.num);
  }
}