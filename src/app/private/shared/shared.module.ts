import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { IconsModule } from 'src/app/icons/icons.module';
import { NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

const components = [
  HeaderComponent,
  SidebarComponent,
  ToolbarComponent,
  PaginationComponent
]

@NgModule({
  declarations: [
    ...components,
  ],
  exports: [
    ...components
  ],
  imports: [
    CommonModule,
    IconsModule,
    NgbTooltipModule,
    RouterModule,
    NgbDropdownModule
  ]
})
export class SharedModule { }
