import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login-service/login.service';
import { EMAIL_ID, PASSWORD } from 'src/app/private/shared/constant/regex.constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService
  ){}

  ngOnInit(): void {
    this.createLoginForm()
  }

  get email(): AbstractControl { return this.loginForm.get('email') as AbstractControl } 
  get password(): AbstractControl { return this.loginForm.get('password') as AbstractControl } 

  // create login page reactive form
  createLoginForm(): void{
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.pattern(EMAIL_ID)]],
      password: [null, [Validators.required, Validators.pattern(PASSWORD)]]
    })
  }


  async loginUser(): Promise<void> {
    this.loginForm.markAllAsTouched();
    if(this.loginForm.invalid){
      alert('Invalid Form, Please fill all the details and try again.');
      return;
    }
    
    const loginFormData = this.loginForm.value;
    const result = await this.loginService.loginUser(loginFormData);

    console.log('result', result);
    if(result === 'SUCCESS'){
      console.log('login successfully');
    } else {
      alert('Email and password are incorrect, Please enter valid email and password.');
    }
  }
}
