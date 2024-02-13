import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {
  @Input() tagsFilters: any = [];
  @Output() tagFilterOutput: EventEmitter<any[]> = new EventEmitter<any[]>();
  selectedTags: any = [];

  constructor() { }

  ngOnInit(): void {
    $(".collapse-block-title1").on('click', function (e) {
      e.preventDefault();
      let speed = 300;
      let nextItem = $(this).next('.collection-collapse-block-content1');
      nextItem.slideToggle(speed);
    });
  }

  checkTags(event: any) {
    if (event.target.checked) {
      this.selectedTags.push(event.target.value);
    } else {
      let index = this.selectedTags.indexOf(event.target.value);
      this.selectedTags.splice(index,1);
    }

    this.tagFilterOutput.emit(this.selectedTags);
  }
}
