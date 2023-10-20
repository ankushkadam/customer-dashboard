import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApplicationContants } from '../../constant/app.constant';
import { ToolbarModel } from '../../model';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  @Output()toolbarItemClickedEmitter: EventEmitter<string> = new EventEmitter<string>();

  toolbarList = [
    {
      icon: 'filter',
      key: ApplicationContants.FILTER,
      value: 'Filter',
    },
    {
      icon: 'refresh-cw',
      key: ApplicationContants.REFRESH,
      value: 'Refresh',
    },
    {
      icon: 'plus-square',
      key: ApplicationContants.ADD,
      value: 'Add Customer',
    }
  ];


  toolbarItemClicked(evt: any, item: ToolbarModel): void {
    this.toolbarItemClickedEmitter.emit(item.key);
  }
}
