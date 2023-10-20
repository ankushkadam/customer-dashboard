import { SimmpleStore } from "../../shared/store/simple-store";
import { CustomerModel } from "../model";

export function customerStoreFactory(): CustomerStore {
  return new CustomerStore({});
}
export class CustomerStore extends SimmpleStore<CustomerModel> {
  constructor(initialState: CustomerModel) {
    super(initialState);
  }
}