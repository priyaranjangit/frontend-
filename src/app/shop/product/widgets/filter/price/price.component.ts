import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Options, LabelType } from "ng5-slider";

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss']
})
export class PriceComponent implements OnInit {
  @Output() priceFilterOutput: EventEmitter<any[]> = new EventEmitter<any[]>();

  minValue: number = 1;
  maxValue: number = 2000;
  options: Options = {
    floor: 1,
    ceil: 2000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return "<b>Min price:</b> ₹" + value;
        case LabelType.High:
          return "<b>Max price:</b> ₹" + value;
        default:
          return "₹" + value;
      }
    }
  };

  constructor() { }

  ngOnInit(): void {
  }

  selectPrice(priceRange: any) {
    let price = [];
    price.push(priceRange.value); // min value
    price.push(priceRange.highValue); // max value

    this.priceFilterOutput.emit(price);
  }

}
