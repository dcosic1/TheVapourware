import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ROLES } from "src/constants/roles";
import { routes } from "src/constants/routes";
import { GlobalService } from "../service/global.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  public user = null;
  private role = null;
  public showDropdown = null;
  public userRoutes = [];
  private allRoutes = routes;

  constructor(
    public globalSvc: GlobalService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    console.log(globalSvc.username);
    this.user = window.localStorage.getItem("loggedInUser");
    console.log("hhhh", this.user);
  }

  public getRoutes() {
    if (!!this.role) {
      this.userRoutes = this.allRoutes.filter((el) =>
        el.roles.includes(this.role)
      );
    }
  }

  public onUserIconClick() {
    this.showDropdown = !this.showDropdown;
  }

  public onLogout() {
    window.localStorage.removeItem("loggedInUser");
    this.user = null;
    this.showDropdown = !this.showDropdown;
    this.router.navigate(["login"]);
  }

  ngOnInit() {
    this.router.events.subscribe((val) => {
      this.user = window.localStorage.getItem("loggedInUser");
      this.role = window.localStorage.getItem("role");
      this.getRoutes();
      console.log("ROUTES", this.role, this.userRoutes);
    });
  }
}
