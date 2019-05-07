import { Component, OnInit } from '@angular/core';
import { FinansijeService } from './finansije.service';
import { Finansije } from '../models/finansije.model';

@Component({
  selector: 'app-finansije',
  templateUrl: './finansije.component.html',
  styleUrls: ['./finansije.component.css']
})
export class FinansijeComponent implements OnInit {

  constructor(private finansijeService: FinansijeService) { 

  }

 finansije: Finansije

  ngOnInit() {
        this.finansijeService.getFinansije().subscribe(
      Finansije => {
          this.finansije = Finansije;
      }
  );
    }

}
