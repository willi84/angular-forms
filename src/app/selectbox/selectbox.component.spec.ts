import {async, TestBed, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';

import { SelectboxComponent } from './selectbox.component';
import { FormControl, FormsModule, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DebugElement } from '@angular/core/src/debug/debug_node';

describe('SelectboxComponent', () => {
  let component: SelectboxComponent;
  let fixture: ComponentFixture<SelectboxComponent>;
  let compiled;
  let inputElement: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SelectboxComponent
      ],
      schemas: [ NO_ERRORS_SCHEMA],
      imports: [
        FormsModule,
        ReactiveFormsModule,
      ]
    })
      .compileComponents();
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SelectboxComponent);
    component = fixture.componentInstance;
    component.name = 'company';
    component.submitted = false;
    component.required = 'true';
    component.group = new FormGroup({
      company:   new FormControl('', [Validators.required])
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
    const control = component.group.controls.company;
    // without event input no value will be set
    inputElement.dispatchEvent(new Event('blur'));

    fixture.detectChanges();
    expect(control.valid).toEqual(false);
    expect(control.pristine).toEqual(true);
    expect(control.touched).toEqual(true);
    expect(control.value).toEqual('');
  }));
  it('should not display error when input is given', fakeAsync(() => {
    const control = component.group.controls.company;
    const name = component.group.controls['company'];
    // without event input no value will be set
    inputElement.value = '';
    inputElement.dispatchEvent(new Event('blur'));
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    // tick();
    expect(control.valid).toEqual(false);
    expect(control.pristine).toEqual(true);
    expect(control.touched).toEqual(true);
    expect(control.value).toEqual('');

  }));
  it('should not display error when input is given', fakeAsync(() => {
    const control = component.group.controls.company;
    const name = component.group.controls['company'];
    // without event input no value will be set
    // inputElement.value = 'xxx';
    inputElement.dispatchEvent(new Event('blur'));
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    expect(control.valid).toEqual(false);
    expect(control.pristine).toEqual(true);
    expect(control.touched).toEqual(true);
    expect(control.value).toEqual('');

    // @TODO: how to do a select?

    // let errors = {};
    // const name = component.group.controls['company'];
    // errors = name.errors || {};
    // expect(errors['required']).toEqual(true);
  }));
});
