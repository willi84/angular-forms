// angular
import { Component } from '@angular/core';
import { async, TestBed, ComponentFixture  } from '@angular/core/testing';
import { FormsModule,  FormControl,  ReactiveFormsModule, FormGroup  } from '@angular/forms';

// to be tested
import { emailCheckValidator } from './emailCheck.validator';

// Test Component
@Component({
    template: `
        <form [formGroup]="myform">
        <input name="email" type="email" formControlName="email"/>
        </form>
    `
})
class TestComponent {
    myform: FormGroup;
}

describe('component: TestComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let compiled;
    let inputElement: any;
        beforeEach(() => {
          TestBed.configureTestingModule({
            imports: [  FormsModule,
                ReactiveFormsModule, ],
            declarations: [TestComponent]
          });
        });
        describe('input component (type=text)', () => {

        beforeEach(async(() => {
            fixture = TestBed.createComponent(TestComponent);
            component = fixture.componentInstance;
            component.myform = new FormGroup({
                email:   new FormControl('', [emailCheckValidator])
                });
            // component.submitted = false;
            fixture.detectChanges();
            compiled = fixture.debugElement.nativeElement;
            inputElement = compiled.querySelector('input');
        }));
        it('should validate Email the right way', async(() => {

            const control = component.myform.get('email');
            const form  = component.myform;

            inputElement.value = 'foobar';
            inputElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            // check invalid email
            expect(control.hasError('pattern')).toBe(true);
            expect(control.valid).toBe(false);
            expect(form.valid).toEqual(false);
            expect(form.hasError('pattern', ['email'])).toEqual(true);

            // check valid email
            inputElement.value = 'foobar@bla.de';
            inputElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            expect(control.valid).toBe(true);
            expect(form.valid).toEqual(true);

            // check missing tld
            inputElement.value = 'foobar@bla.';
            inputElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            expect(form.hasError('pattern', ['email'])).toEqual(true);
            expect(control.errors.pattern).toEqual('noTld');
            expect(control.valid).toBe(false);
            expect(form.valid).toEqual(false);

            // check missing .tld
            inputElement.value = 'foobar@bla';
            inputElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            expect(form.hasError('pattern', ['email'])).toEqual(true);
            expect(control.errors.pattern).toEqual('invalidDomain');
            expect(control.valid).toBe(false);
            expect(form.valid).toEqual(false);

            // check missing domain.tld
            inputElement.value = 'foobar@';
            inputElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            expect(form.hasError('pattern', ['email'])).toEqual(true);
            expect(control.errors.pattern).toEqual('noDomain');
            expect(control.valid).toBe(false);
            expect(form.valid).toEqual(false);

            // check empty
            inputElement.value = '';
            inputElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            expect(form.hasError('required', ['email'])).toEqual(true);
            expect(control.errors.required).toEqual(true);
            expect(control.valid).toBe(false);
            expect(form.valid).toEqual(false);
        }));
    });
 });
