import { ApplicationContants } from "../../shared/constant/app.constant";

export class CustomerConfig {
  pageData = {
    count: 0,
    size: 3,
    currentPage: 0,
  };

  sortData = [{ key: 'id', value: 'desc' }];
}