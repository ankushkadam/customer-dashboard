import { Component, OnInit } from '@angular/core';
import { CustomerStore } from '../../store/customer.store';
import { CustomerService } from '../../service/customer.service';
import { Observable } from 'rxjs';
import { ApplicationContants } from 'src/app/private/shared/constant/app.constant';
import { CustomerListModel } from '../../model';

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.scss']
})
export class CustomerHomeComponent implements OnInit{
  columns = [
    {name: 'Name', tooltip: 'Name'},
    {name: 'Email', tooltip: 'Email'},
    {name: 'PhoneNumber', tooltip: 'PhoneNumber'},
    {name: 'Action'}
  ];

  rowData$: Observable<any> = this.store.select('rowData');
  toolbar$: Observable<any> = this.store.select('toolbarData');
  pageDate$: Observable<any> = this.store.select('pageData');

  isCustomerDashboard = true;

  constructor(
    private store: CustomerStore,
    private service: CustomerService
  ){}

  ngOnInit(): void {
    this.service.getAllCustomerList();
  }
  
  toolbarClickEvent(event: string): void {
    switch(event){
      case ApplicationContants.ADD:
        this.store.setState({selectedSampleSubmission: null});
        this.isCustomerDashboard = false;
      break;

      case ApplicationContants.REFRESH:
        this.service.getAllCustomerList();
        break;
    }
  }

  formCloseEvent(): void {
    this.isCustomerDashboard = true;
  }

  pageChangeEvent(evt: number): void {
    this.service.changePageEvent(evt);
  } 

  editCustomer(selectedCustomer: CustomerListModel): void {
    this.store.setState({selectedCustomer});
    this.isCustomerDashboard = false;
  }

  deleteCustomer(selectedCustomer: CustomerListModel): void {
    this.service.deleteCustomer(selectedCustomer);
  }
}
