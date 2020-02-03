import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Shoe, ShoesService } from '@mdv7/core-data';

@Component({
  selector: 'mdv7-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() data: Shoe[];
  @Input() selected: Shoe;
  @Output() delete = new EventEmitter();
  @Output() selectt = new EventEmitter();

  constructor(private service: ShoesService) { }

  ngOnInit() {

  }

}
