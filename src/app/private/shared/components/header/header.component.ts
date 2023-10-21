import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() logOutUserEvent = new EventEmitter();
  isHambergerClick = false

  menuList = [
    {
      displayName: 'Dashboard',
      name: 'dashboard',
      selected: true,
      url: '/customer-dashboard'
    },
    {
      displayName: 'User',
      name: 'user',
      selected: false,
      url: '/user'
    }
  ];

  logoutUser(): void {
    this.logOutUserEvent.emit();
  }

  showMenu(menu: any): void {
    this.menuList.forEach(m => m.selected = false);
    menu.selected = true;
    this.isHambergerClick = false;
  }
}
