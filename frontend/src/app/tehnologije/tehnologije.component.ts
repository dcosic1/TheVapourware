import { Component, OnInit } from '@angular/core';
import { TehnologijeService } from './tehnologije.service';
import { Tehnologije } from '../models/tehnologije.model';

@Component({
  selector: 'app-tehnologije',
  templateUrl: './tehnologije.component.html',
  styleUrls: ['./tehnologije.component.css']
})
export class TehnologijeComponent implements OnInit {

tehnologije: Tehnologije

  constructor(private tehnologijeService: TehnologijeService) { }

  ngOnInit()
  {

      this.tehnologijeService.getTehnologije().subscribe(
        Tehnologije =>
        {
            this.tehnologije = Tehnologije;
        }
      );

  }

}
