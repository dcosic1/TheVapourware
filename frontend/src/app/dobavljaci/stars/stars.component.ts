import { Component, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnChanges {
  @Input() rating: number;
  starWidth: number;
  
  ngOnChanges(): void {
    this.starWidth = this.rating * 75 / 5;
  }

}
