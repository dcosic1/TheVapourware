import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public isSubmitted = false;
  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  public onSubmit(){
    this.isSubmitted = true;

    if(this.loginForm.valid){

    }

  }

  private createForm(){
    this.loginForm = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

}
