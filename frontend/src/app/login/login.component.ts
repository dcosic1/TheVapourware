import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { GlobalService } from "../service/global.service";
import { Router } from "@angular/router";
import * as users from "../../assets/api/users.json";
import _ from 'lodash';
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public isSubmitted = false;
  public fieldTextType: boolean = false;
  public userNotFound: string | null = null;
  constructor(
    private _fb: FormBuilder,
    private router: Router,
    public globalSvc: GlobalService
  ) {}

  public onSubmit() {
    this.isSubmitted = true;
    this.userNotFound = null;
    const userExists = users.find(
      el =>
        el.username === this.loginForm.value.username &&
        el.password === this.loginForm.value.password
    );
    if (this.loginForm.valid && userExists) {
      window.localStorage.setItem('loggedInUser', userExists.username);
      window.localStorage.setItem('role', userExists.role);
      this.router.navigate(["home"]);
    }
    if(this.loginForm.valid && !userExists) this.userNotFound =  'Pogrešno korisničko ime ili šifra';
  }

  public toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  private createForm() {
    this.loginForm = this._fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  ngOnInit() {
    this.createForm();
    if(!window.localStorage.getItem('users')){
      window.localStorage.setItem('users', JSON.stringify( _.get(users, 'default', [])))
    }
  }
}
