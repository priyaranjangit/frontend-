import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent implements OnInit {
  @Input() colorsFilters: any = [];
  @Output() colorFilterOutput: EventEmitter<any[]> = new EventEmitter<any[]>();
  activeColor: any = '';

  constructor() { }

  ngOnInit(): void {

  }

  selectColor(cls: any) {
    this.activeColor = cls.color;

    if (cls.color) {
      this.colorFilterOutput.emit([cls]);
    } else {
      this.colorFilterOutput.emit([]);
    }
  }

}
