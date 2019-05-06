import { Component, OnInit } from '@angular/core';
import { OdjeliService } from './odjeli.service';
import { Odjel } from 'src/app/models/odjel.imodel';


@Component({
  selector: 'app-odjeli',
  templateUrl: './odjeli.component.html',
  styleUrls: ['./odjeli.component.css']
})
export class OdjeliComponent implements OnInit {

  constructor(private odjeliService:OdjeliService) { }
  odjeli: Odjel[]=[]
  ngOnInit() {
    this.odjeliService.getOdjel().subscribe(
      odjeli=>this.odjeli=odjeli
      );
  }

}
