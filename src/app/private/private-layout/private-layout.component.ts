import { Component } from '@angular/core';
import { LoginService } from 'src/app/public/services/login-service/login.service';

@Component({
  selector: 'app-private-layout',
  templateUrl: './private-layout.component.html',
  styleUrls: ['./private-layout.component.scss']
})
export class PrivateLayoutComponent {

  constructor(
    private loginService: LoginService
  ){}

  logOutUser(): void {
    this.loginService.logout();
  }
}
