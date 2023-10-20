import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Output()pageChangedEmitter: EventEmitter<number> = new EventEmitter<number>();

  offset = 0; //current page
  pageSizeLabel = '';

  isDisableNext = false;
  isDisablePrevious = true
  pageInfo: any;
  totalPages: any;
  start: any;
  end: any;

  @Input()
  set pageData(value: any) {
    this.pageInfo = value;
    this.offset = value?.currentPage === 0 ? value.currentPage : this.offset;
    if (value) {
      // this.setPageSizeLabel(value);
      // this.enableDisableButtons(value);
      this.calculateTotalPages();
      this.enableDisableButtons();
    }
  }

  calculateTotalPages(): void {
    this.start = this.offset + 1;
    const end = this.pageInfo.size * this.start;
    this.end = end > this.totalPages ? this.totalPages : end;

    this.totalPages = Math.ceil(this.pageInfo.count / this.pageInfo.size);
    this.setPageSizeLabel();
  }

  setPageSizeLabel(): void {
    if (this.pageInfo) {
      this.start = this.offset * this.pageInfo.size + 1;
      const end = this.pageInfo.size + this.start - 1;
      this.end = end > this.pageInfo.count ? this.pageInfo.count : end;
      // this.customLabel = this.start + ' to ' + this.end + ' of ' + this.pageInfo.count;
      this.pageSizeLabel = this.getStartLabel() + ' to ' + this.end + ' of ' + this.pageInfo.count;
    } else {
      this.pageSizeLabel = '';
    }
  }

  getStartLabel(): number {
    return (this.end <= 0) ? 0 : this.start;
  }


  nextPage(): void {
    this.offset = this.offset + 1;
    this.pageChangedEmitter.emit(this.offset);
    this.enableDisableButtons();
  }

  previousPage(): void {
    if (this.offset > 0) {
      this.offset = this.offset - 1;
      this.pageChangedEmitter.emit(this.offset);
    }
    this.enableDisableButtons();
  }

  enableDisableButtons(): void {
    this.isDisablePrevious = false;
    this.isDisableNext = false;
    if (this.offset + 1 === this.totalPages) {
      this.isDisableNext = true;
    }

    if (this.offset === 0) {
      this.isDisablePrevious = true;
    }
    this.setPageSizeLabel();
  }
}
