import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login-service/login.service';

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

  // create login page reactive form
  createLoginForm(): void{
    this.loginForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    })
  }


  async loginUser(): Promise<void> {
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
