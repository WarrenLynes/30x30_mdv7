import { Component, OnInit } from '@angular/core';
import { Shoe, ShoesService } from '@mdv7/core-data';
import { BehaviorSubject } from 'rxjs';
import { DetailComponent } from './detail/detail.component';
import { MatDialog } from '@angular/material';
import { KicksFacade } from '@mdv7/core-state';

@Component({
  selector: 'mdv7-kicks',
  templateUrl: './kicks.component.html',
  styleUrls: ['./kicks.component.scss']
})
export class KicksComponent implements OnInit {

  shoes$;
  selectedShoe$ = new BehaviorSubject({
    title: null,
    details: null,
    'cool-level': null
  });
  showDetail = true;

  constructor(
    private service: ShoesService,
    private facade: KicksFacade
  ) { }

  ngOnInit() {
    this.getShoes();
  }

  reset() {
    this.showDetail = false;
    this.selectedShoe$.next({
      title: null,
      details: null,
      'cool-level': null
    });

    setTimeout(() => {
      this.showDetail = true;
    }, 10);
  }

  getShoes() {
    this.shoes$ = this.service.all();
    this.facade.load();
  }

  selectShoe(shoe: Shoe) {
    this.selectedShoe$.next(shoe);
  }

  deleteShoe(shoe) {
    this.service.delete(shoe.id).subscribe(() => {
      this.getShoes();
      this.reset();
    });
  }

  saveShoe(shoe) {
    if (!shoe.id) {
      this.createShoe(shoe);
    } else {
      this.updateShoe(shoe);
    }
    this.reset();
  }

  createShoe(shoe) {
    this.service.create(shoe).subscribe(() => {
      this.getShoes();
      this.reset();
    });
  }

  updateShoe(shoe) {
    this.service.update(shoe).subscribe(() => {
      this.getShoes();
      this.reset();
    });
  }

  cancel() {
    this.reset();
  }
}
