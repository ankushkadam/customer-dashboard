import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EMAIL_ID, MOBILE_NUMBER_REGEX } from 'src/app/private/shared/constant/regex.constant';
import { CustomerService } from '../../service/customer.service';
import { CustomerStore } from '../../store/customer.store';
import { CustomerListModel } from '../../model';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {

  @Output() formCloseEvent = new EventEmitter()
  customerForm!: FormGroup;
  customerId: number | undefined;



  constructor(
    private fb: FormBuilder,
    private service: CustomerService,
    private store: CustomerStore
  ){}

  ngOnInit(): void {
    const { selectedCustomer } = this.store.getStateSnapshot();
    this.createCustomerForm(selectedCustomer);
    
  }

  get firstName(): AbstractControl { return this.customerForm.get('firstName') as AbstractControl;}
  get lastName(): AbstractControl { return this.customerForm.get('lastName') as AbstractControl;}
  get email(): AbstractControl { return this.customerForm.get('email') as AbstractControl;}
  get phoneNumber(): AbstractControl { return this.customerForm.get('phoneNumber') as AbstractControl;}

  createCustomerForm(selectedCustomer: CustomerListModel | undefined): void{
    this.customerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(EMAIL_ID)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(MOBILE_NUMBER_REGEX)]],
    });

    if(selectedCustomer){
      this.patchCustomerFormData(selectedCustomer);
    }
  }


  patchCustomerFormData(selectedCustomer: CustomerListModel | undefined): void {
    if(selectedCustomer) {
      this.customerId = selectedCustomer?.id;
      this.customerForm.patchValue(selectedCustomer);
    }
  }

  submit(): void{
    this.customerForm.markAllAsTouched();
    if(this.customerForm.invalid){
      alert('Invalid form, Please fill are correct deatails');
      return
    }

    const formData = this.customerForm.value;
    this.service.addAndEditCustomer(formData, this.customerId);
    this.closeForm();   
  }

  closeForm(): void {
    this.formCloseEvent.emit();
  }


}
