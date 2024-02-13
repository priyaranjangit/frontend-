import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $(".collapse-block-title").on('click', function (e) {
      e.preventDefault();
      let speed = 300;
      let nextItem = $(this).next('.collection-collapse-block-content');
      nextItem.slideToggle(speed);

      //let thisItem = $(this).parent();
      // if(thisItem.hasClass('open')){
      //   thisItem.removeClass('open')
      //   nextItem.slideUp(speed);
      // } else {
      //   thisItem.addClass('open')
      //   nextItem.slideDown(speed);
      //}
    });
  }

}
