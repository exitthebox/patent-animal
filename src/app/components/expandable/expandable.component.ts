import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'expandable',
  templateUrl: './expandable.component.html',
  styleUrls: ['./expandable.component.scss']
})
export class ExpandableComponent implements OnInit {

  @Input('expanded') expanded;
  @Input('expandHeight') expandHeight;

  currentHeight: number = 0;

  constructor() { 
    // console.log('Hello expandable component')
  }

  ngOnInit() {
  }

  ngAfterViewInit(){
    // console.log(this.expanded)
    // console.log(this.expandHeight)

    

  }

}
