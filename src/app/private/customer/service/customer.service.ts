import { Injectable } from '@angular/core';
import { CustomerConfig } from '../config/customer.config';
import { CustomerStore } from '../store/customer.store';
import { customerList } from '../store/customer-data.store';
import { CustomerListModel } from '../model';

@Injectable()
export class CustomerService {

  constructor(
    private customerConfig: CustomerConfig,
    private store: CustomerStore
  ) {
    this.store.resetState();
    this.store.setState({ ...this.customerConfig});
  }


  getAllCustomerList(): void {
    const cloneExistingAndUpdatedCustomerList = JSON.parse(JSON.stringify(customerList?.filter(c => c.active === true)));
    if(cloneExistingAndUpdatedCustomerList && cloneExistingAndUpdatedCustomerList.length){
      // sorting list
      this.sortingCustomerList(cloneExistingAndUpdatedCustomerList);

      // showing record to UI as per pagination config
      const filterList = this.filterCustomerAsPerPagination(cloneExistingAndUpdatedCustomerList);
      this.store.setState({rowData: filterList});
    } else{
      this.store.setState({rowData: []});
    }
  }

  sortingCustomerList(cloneExistingAndUpdatedCustomerList: CustomerListModel[]): void {
    const { sortData } = this.store.getStateSnapshot();
    if(sortData[0]?.value === 'asc') {
      cloneExistingAndUpdatedCustomerList.sort((a:any, b: any) => a[sortData[0]?.key] - b[sortData[0]?.key]); 
    } else {
      cloneExistingAndUpdatedCustomerList.sort((a:any, b: any) => b[sortData[0]?.key] - a[sortData[0]?.key]);
    }
  }

  filterCustomerAsPerPagination(cloneExistingAndUpdatedCustomerList: CustomerListModel[]): CustomerListModel[]{
    let filterList: CustomerListModel[] = [];
    let { pageData } = this.store.getStateSnapshot();
    pageData.count = cloneExistingAndUpdatedCustomerList.length;

    if(pageData.currentPage === 0){
      filterList = cloneExistingAndUpdatedCustomerList.splice(0, pageData.size);
    } else {
      filterList = cloneExistingAndUpdatedCustomerList.splice(pageData.currentPage * pageData?.size, pageData.size);
    }

    
    return filterList;
  }

  addCustomer(): void {
    const {rowData} = this.store.getStateSnapshot();
    rowData?.push({firstName: 'Nayan', lastName: 'Sutar', email: 'xyz@gmail.com', phoneNumber: '8596748596'},);
    rowData?.reverse();
  }

  // Method to add and Edit customer
  addAndEditCustomer(formData: any, customerId: number | undefined): void {
    //Add customer section:
    if(!customerId){
      formData['id'] = (customerList?.length > 0) ? customerList?.length : 1;
      formData['active'] = true;
      customerList?.push(formData);
    } else {
      // Edit customer section
      const indexNumber = customerList?.findIndex(r => r.id === customerId);
      if(indexNumber){
        customerList[indexNumber].id = customerId;
        customerList[indexNumber].active = true;
        customerList[indexNumber].email = formData.email;
        customerList[indexNumber].firstName = formData.firstName;
        customerList[indexNumber].lastName = formData.lastName;
        customerList[indexNumber].phoneNumber = formData.phoneNumber;
      }
    }
    
    this.getAllCustomerList();

  }

  changePageEvent(pageNo: number): void {
    const { pageData } = this.store.getStateSnapshot();
    pageData.currentPage = pageNo;
    this.store.setState({pageData});
    this.getAllCustomerList();
  }

  deleteCustomer(selectedCustomer: CustomerListModel): void {
    if(customerList && customerList.length){

      const existingIndex = customerList?.findIndex(r => r.id === selectedCustomer?.id);
      customerList[existingIndex].active = false;
    }
    this.getAllCustomerList();
  }
}
