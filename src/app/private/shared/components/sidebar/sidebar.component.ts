import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

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


  showMenu(menu: any): void {
    this.menuList.forEach((m) => {
      m.selected = false;
    });
    menu.selected = true;
  }
}
