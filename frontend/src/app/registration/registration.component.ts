import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public registrationForm: FormGroup;
  public isSubmitted = false;
  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.createForm()
  }

  public onSubmit(){
    this.isSubmitted = true;

    if(this.registrationForm.valid){

    }

  }

  private createForm(){
    this.registrationForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword:['', Validators.required],
    });
  }

}
