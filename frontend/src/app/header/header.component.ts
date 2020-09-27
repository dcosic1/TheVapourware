import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../service/global.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  public user = null;
  public showDropdown = null;

  constructor(public globalSvc: GlobalService,  private router: Router, private activeRoute: ActivatedRoute) {
    console.log(globalSvc.username)
    this.user = window.localStorage.getItem('loggedInUser');
    console.log('hhhh', this.user)
   }

  public onUserIconClick() {
    this.showDropdown = !this.showDropdown;
  }

  public onLogout() {
    window.localStorage.removeItem('loggedInUser');
    this.user = null;
    this.showDropdown = !this.showDropdown;
    this.router.navigate(["login"]);
  }
  
  ngOnInit() {
    this.router.events.subscribe(val => {
      this.user = window.localStorage.getItem('loggedInUser');
    });
  }

}
