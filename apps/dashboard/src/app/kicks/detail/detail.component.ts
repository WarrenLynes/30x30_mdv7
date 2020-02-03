import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Shoe } from '@mdv7/core-data';

@Component({
  selector: 'mdv7-detail',
  templateUrl: './detail.component.html'
})
export class DetailComponent implements OnChanges {

  id: number = null;
  detailForm: FormGroup;
  showForm = false;

  @Input() selected: Shoe;
  @Output() cancelled = new EventEmitter();
  @Output() saved = new EventEmitter();

  constructor() {
    this.buildForm({
      title: null,
      details: null,
      coolLevel: null
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.selected.currentValue !== changes.selected.previousValue) {
      this.buildForm(this.selected);
    } else {
      this.buildForm({
        title: null,
        details: null,
        coolLevel: null
      });
    }
  }

  buildForm(selected?) {
    this.detailForm = new FormGroup({
      coolLevel: new FormControl(selected.coolLevel, Validators.compose([ Validators.max(100), Validators.required ])),
      title: new FormControl(selected.title, Validators.compose([ Validators.minLength(3), Validators.required ])),
      details: new FormControl(selected.details, Validators.compose([ Validators.minLength(25), Validators.required ]))
    });
    this.showForm = true;
  }

  onSubmit() {
    this.showForm = false;
    this.saved.emit({...this.selected,
      title: this.detailForm.get('title').value,
      details: this.detailForm.get('details').value,
      'cool-level': this.detailForm.get('coolLevel').value,
    });
    this.detailForm.reset();
  }

  onCancel() {
    this.cancelled.emit();
  }
}
