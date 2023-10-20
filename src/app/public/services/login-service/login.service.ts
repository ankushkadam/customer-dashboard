import { Injectable } from '@angular/core';
import { LoginModel } from '../../model';
import { Router } from '@angular/router';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  user = {
    email: 'ankushkadam@gmail.com',
    password: 'ankush123'
  }

  constructor(
    private storageService: LocalStorageService,
    private router: Router
  ) { }

  loginUser(loginFormData: LoginModel): string {
    let loginResult: 'SUCCESS' | 'FAILURE';

    const { email, password} = loginFormData;
    if(this.user['email'] === email && this.user['password'] === password) {
      loginResult = 'SUCCESS';
      this.redirectToDashboard();
      this.storageService.setItem('isUserLoggedIn', true);
    } else {
      loginResult = 'FAILURE'
    }
    return loginResult;
  } 

  redirectToDashboard(): void {
    this.router.navigate(['/customer-dashboard']);
  }

  logout(): void {
    this.storageService.clear();
    this.router.navigate(['/login']);
  }
}
