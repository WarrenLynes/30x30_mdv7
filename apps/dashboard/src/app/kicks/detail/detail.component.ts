import { AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Shoe } from '@mdv7/core-data';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { KicksFacade } from '@mdv7/core-state';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'mdv7-detail',
  templateUrl: './detail.component.html'
})
export class DetailComponent implements OnInit, OnDestroy {

  entity: Shoe;
  entity$: Observable<Shoe>;
  destroy$: Subject<boolean> = new Subject<boolean>();
  detailForm: FormGroup;
  showForm = false;

  constructor(
    private facade: KicksFacade,
    private router: Router,
    private route: ActivatedRoute
  ) {
    console.log(this.route.snapshot.params.id);
  }

  ngOnInit(): void {
    this.entity$ = this.facade.selected$.pipe(
      withLatestFrom(this.route.paramMap),
      // TODO: set 'selected' when :id param is available in paramMap
      tap(([entity]) => !entity ? this.router.navigateByUrl('/') : null),
      map(([entity]) => {
        this.entity = entity;
        this.buildForm();
        return entity;
      })
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  buildForm() {
    if(this.entity) {
      this.detailForm = new FormGroup({
        coolLevel: new FormControl(this.entity['cool-level'], Validators.compose([ Validators.max(100), Validators.required ])),
        title: new FormControl(this.entity.title, Validators.compose([ Validators.minLength(3), Validators.required ])),
        details: new FormControl(this.entity.details, Validators.compose([ Validators.minLength(25), Validators.required ]))
      });
      this.showForm = true;
    }
  }

  onSubmit() {
    // this.showForm = false;
    // this.saved.emit({...this.selected,
    //   title: this.detailForm.get('title').value,
    //   details: this.detailForm.get('details').value,
    //   'cool-level': this.detailForm.get('coolLevel').value,
    // });
  }

  onCancel() {
    this.facade.reset();
    this.router.navigateByUrl('/kicks');
  }
}
