import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { GlobalService } from "../service/global.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.css"]
})
export class RegistrationComponent implements OnInit {
  public registrationForm: FormGroup;
  public isSubmitted = false;
  public fieldTextTypePass: boolean = false;
  public fieldTextTypeRepeat: boolean = false;
  public userAlreadyExists: string | null = null;

  private users;

  constructor(
    private _fb: FormBuilder,
    public globalSvc: GlobalService,
    private router: Router
  ) {
    this.users = JSON.parse(window.localStorage.getItem("users") || "{[]}") || [];
    console.log('window.localStorage.getItem("users")', window.localStorage.getItem("users"))
  }

  public toggleFieldTextType() {
    this.fieldTextTypePass = !this.fieldTextTypePass;
  }
  public toggleFieldTextTypeRepeat() {
    this.fieldTextTypeRepeat = !this.fieldTextTypeRepeat;
  }

  public onSubmit() {
    console.log('usersss', this.users, this.registrationForm.value.username);

    this.isSubmitted = true;
    const userExists = this.users.find(
      el => el.username === this.registrationForm.value.username
    );
    console.log('userExists', userExists);
    const passwordsMatch = this.registrationForm.value.password === this.registrationForm.value.confirmPassword;
    if (this.registrationForm.valid && !userExists && passwordsMatch) {
      const newUsers = this.users.concat([
        {
          username: this.registrationForm.value.username,
          password: this.registrationForm.value.password
        }
      ]);
      window.localStorage.setItem("users", JSON.stringify(newUsers));
      window.localStorage.setItem('loggedInUser', this.registrationForm.value.username);
      this.router.navigate(["home"]);
    } 
    if (this.registrationForm.valid && userExists) {
      this.userAlreadyExists = `Račun sa korisničkim imenom ${this.registrationForm.value.username} već postoji`;
    }
    if(!passwordsMatch){
      this.registrationForm.get('confirmPassword').setErrors({
        confirmPassword: { message: 'server error :)' },
      });
      this.registrationForm.controls.confirmPassword.setErrors({incorrect: 'Šifre moraju biti iste'})
    }
  }

  private createForm() {
    this.registrationForm = this._fb.group({
      username: ["", [Validators.required]],
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required]
    });
  }

  ngOnInit() {
    this.createForm();
  }
}
