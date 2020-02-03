import { Component } from '@angular/core';
import { Shoe } from '@mdv7/core-data';
import { KicksFacade } from '@mdv7/core-state';
import { Router } from '@angular/router';

@Component({
  selector: 'mdv7-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  get data$() {
    return this.facade.kicks$;
  }

  constructor( private facade: KicksFacade, private router: Router ) {}

  onDelete(entity: Shoe) {
    // this.facade.delete(entity);
  }

  onSelect(entity: Shoe) {
    this.facade.select(entity);
    this.router.navigateByUrl(`/kicks/${entity.id}`)
  }

  onEdit(entity: Shoe) {
  }
}
