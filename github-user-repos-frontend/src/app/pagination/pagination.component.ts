import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent {
  @Input() noOfPages!: number;
  @Input() activePage!: number;
  @Input() pages: number[] = [];

  @Output() nextPage = new EventEmitter();
  @Output() prevPage = new EventEmitter();
  @Output() selectPage = new EventEmitter<number>();

  onNext() {
    this.nextPage.emit();
  }
  onPrev() {
    this.prevPage.emit();
  }
  selectedPage(page: number) {
    this.selectPage.emit(page);
  }
}
