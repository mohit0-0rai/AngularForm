import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignupModel } from '../models/signup.model';
import { SignupService } from '../services/signup.service';
import { ResponseModel } from '../models/response.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signup: FormGroup;
  username: FormControl;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  password: FormControl;
  private signupModel: SignupModel;

  constructor(private signupService: SignupService, private router: Router) { }
  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.username = new FormControl('', Validators.required);
    this.firstName = new FormControl('', Validators.required);
    this.lastName = new FormControl('', Validators.required);
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern('[^ @]*@[^ @]*')
    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]);

  }

  createForm() {
    this.signup = new FormGroup({
      username: this.username,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    });
  }

  setModel() {
    this.signupModel = new SignupModel();
    this.signupModel.email = this.email.value;
    this.signupModel.firstName = this.firstName.value;
    this.signupModel.lastName = this.lastName.value;
    this.signupModel.password = this.password.value;
    this.signupModel.username = this.username.value;

  }
  onSubmit() {
    console.log('In Submit');
    this.setModel();
    let res: ResponseModel;
    this.signupService.signup(this.signupModel).subscribe(data => {
      res = data;
      if (res.code !== '200') {
        console.error(data.message);
      } else {
        this.router.navigate(['/home']);
      }
    });

  }
}
