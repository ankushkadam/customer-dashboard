import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerHomeComponent } from './pages/customer-home/customer-home.component';
import { CustomerFormComponent } from './pages/customer-form/customer-form.component';
import { CustomerRoutingModule } from './customer-routing';
import { SharedModule } from '../shared/shared.module';
import { IconsModule } from 'src/app/icons/icons.module';
import { CustomerService } from './service/customer.service';
import { CustomerConfig } from './config/customer.config';
import { CustomerStore, customerStoreFactory } from './store/customer.store';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CustomerHomeComponent,
    CustomerFormComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule,
    IconsModule,
    ReactiveFormsModule
  ],
  providers: [
    CustomerService,
    CustomerConfig,
    {
      provide: CustomerStore,
      useFactory: customerStoreFactory
    }
  ]
})
export class CustomerModule { }
