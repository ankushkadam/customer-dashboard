import { ToolbarModel } from "../../shared/model";
import { PageData } from "../../shared/model/page.model";

export interface CustomerModel {
  toolbarData?: ToolbarModel[];
  pageData?: any;
  rowData?: CustomerListModel[];
  selectedCustomer?: CustomerListModel;
  sortData?: any;
  searchTerm?: string;
}

export interface CustomerListModel {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  active?: boolean;
} 