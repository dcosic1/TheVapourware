import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from '../service/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public isSubmitted = false;
  constructor(private _fb: FormBuilder, public globalSvc: GlobalService) { }

  ngOnInit() {
    this.createForm();
  }

  public onSubmit(){
    this.isSubmitted = true;

    if(this.loginForm.valid){
      this.globalSvc.setUserName(this.loginForm.value.username);
    }
  }

  private createForm(){
    this.loginForm = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

}
