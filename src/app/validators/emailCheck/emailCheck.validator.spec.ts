import { Component, Directive } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule, NG_VALIDATORS, AbstractControl,
         NgForm, FormControl } from '@angular/forms';
         import { EmailCheckValidator } from './emailCheck.validator';

// Test Component
@Component({
template: `
    <form>
    <input name="email" type="email" ngModel emailCheck />
    </form>
`
})
class TestComponent {
}

describe('component: TestComponent', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ FormsModule ],
        declarations: [TestComponent, EmailCheckValidator]
      });
    });

    it('should validate Email the right way', async(() => {

        const fixture = TestBed.createComponent(TestComponent);
        const comp = fixture.componentInstance;
        const debug = fixture.debugElement;
        const input = debug.query(By.css('[name=email]'));

        fixture.detectChanges();
        fixture.whenStable().then(() => {

            const form: NgForm = debug.children[0].injector.get(NgForm);
            const control = form.control.get('email');

            input.nativeElement.value = 'foobar';
            input.nativeElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();


            // check invalid email
            expect(control.hasError('EmailCheck')).toBe(true);
            expect(control.valid).toBe(false);
            expect(form.control.valid).toEqual(false);
            expect(form.control.hasError('EmailCheck', ['email'])).toEqual(true);

            // check valid email
            input.nativeElement.value = 'foobar@bla.de';
            input.nativeElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            expect(control.valid).toBe(true);
            expect(form.control.valid).toEqual(true);

            // check missing tld
            input.nativeElement.value = 'foobar@bla.';
            input.nativeElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            expect(form.control.hasError('EmailCheck', ['email'])).toEqual(true);
            expect(control.errors.EmailCheck).toEqual('noTld');
            expect(control.valid).toBe(false);
            expect(form.control.valid).toEqual(false);

            // check missing .tld
            input.nativeElement.value = 'foobar@bla';
            input.nativeElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            expect(form.control.hasError('EmailCheck', ['email'])).toEqual(true);
            expect(control.errors.EmailCheck).toEqual('invalidDomain');
            expect(control.valid).toBe(false);
            expect(form.control.valid).toEqual(false);

            // check missing domain.tld
            input.nativeElement.value = 'foobar@';
            input.nativeElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            expect(form.control.hasError('EmailCheck', ['email'])).toEqual(true);
            expect(control.errors.EmailCheck).toEqual('noDomain');
            expect(control.valid).toBe(false);
            expect(form.control.valid).toEqual(false);

            // check empty
            input.nativeElement.value = '';
            input.nativeElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            expect(form.control.hasError('EmailCheck', ['email'])).toEqual(true);
            expect(control.errors.EmailCheck).toEqual('noEmailAddress');
            expect(control.valid).toBe(false);
            expect(form.control.valid).toEqual(false);
        });
    }));
});
