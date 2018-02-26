import {async, TestBed, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';

import { SalutationComponent } from './salutation.component';
import { FormControl, FormsModule, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DebugElement } from '@angular/core/src/debug/debug_node';
import { SelectboxComponent } from '../selectbox/selectbox.component';

describe('SalutationComponent', () => {
  let component: SalutationComponent;
  let fixture: ComponentFixture<SalutationComponent>;
  let compiled;
  let inputElement: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SalutationComponent,
        SelectboxComponent
      ],
      // schemas: [ NO_ERRORS_SCHEMA],
      imports: [
        FormsModule,
        ReactiveFormsModule,
      ]
    })
      .compileComponents();
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SalutationComponent);
    component = fixture.componentInstance;

    component.tagName = 'salutation';
    component.submitted = false;
    component.required = 'true';
    component.group = new FormGroup({
      salutation:  new FormControl('', [Validators.required])
    });
    component.ngOnInit();
    // component.submitted = false;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
    inputElement = compiled.querySelector('select');
  }));

  it('should be created', async( () => {
    expect(component).toBeTruthy();
  }));
  it('should not display error when input is touched', fakeAsync(() => {
    const control = component.group.controls.salutation;
    // without event input no value will be set
    inputElement.dispatchEvent(new Event('blur'));

    fixture.detectChanges();
    expect(control.valid).toEqual(false);
    expect(control.pristine).toEqual(true);
    expect(control.touched).toEqual(true);
    expect(control.value).toEqual('');
    expect(compiled.querySelector('.salutation-error').innerText).toEqual('');
    let errors = {};
    const name = component.group.controls['salutation'];
    errors = name.errors || {};
    expect(errors['required']).toEqual(true);
  }));
  it('should not display error when input is given', fakeAsync(() => {
    const control = component.group.controls.salutation;
    const name = component.group.controls['salutation'];
    // without event input no value will be set
    inputElement.value = 'xxx';
    inputElement.dispatchEvent(new Event('blur'));
    inputElement.dispatchEvent(new Event('select'));

    fixture.detectChanges();

    expect(control.valid).toEqual(false);
    expect(control.pristine).toEqual(true);
    expect(control.touched).toEqual(true);
    expect(control.value).toEqual('');

    expect(compiled.querySelector('.salutation-error').innerText).not.toContain('Name is required');
    const errors = control.errors || {};
    expect(errors['required']).toEqual(true);

  }));
});
