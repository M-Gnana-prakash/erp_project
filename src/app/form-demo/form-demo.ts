import { Component } from '@angular/core';
import { CheckboxControlValueAccessor, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Import your components
import { McvInputField } from '../shared/components/form/mcv-input-field/mcv-input-field';
import { McvEmailField } from '../shared/components/form/mcv-email-field/mcv-email-field';
import { McvPasswordField } from '../shared/components/form/mcv-password-field/mcv-password-field';
import { McvPhoneField } from '../shared/components/form/mcv-phone-field/mcv-phone-field';
import { McvDatePicker } from '../shared/components/form/mcv-date-picker/mcv-date-picker';
import { McvCheckbox } from '../shared/components/form/mcv-checkbox/mcv-checkbox';
import { McvDateRangePicker } from '../shared/components/form/mcv-date-range-picker/mcv-date-range-picker';
import { McvTextArea } from '../shared/components/form/mcv-text-area/mcv-text-area';
import { McvRadioField } from '../shared/components/form/mcv-radio-field/mcv-radio-field';
import { McvToggleField } from '../shared/components/form/mcv-toogle-field/mcv-toogle-field';
import { McvTimePicker } from '../shared/components/form/mcv-time-picker/mcv-time-picker';

@Component({
  selector: 'app-form-demo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    McvInputField,
    McvEmailField,
    McvPasswordField,
    McvPhoneField,
    McvDatePicker,
    McvCheckbox,
    McvDateRangePicker,
    McvTextArea,
    McvRadioField,
    McvToggleField,
    McvTimePicker,
  ],
  templateUrl: './form-demo.html'
})
export class FormDemo {

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: [''],
      email: [''],
      password: [''],
      phone: [''],
      dob: [''],
      description: [''],
      gender: [''],
      isAgreed: [false],
      time: [''],
      dateRange: [''],
      CheckboxControlValueAccessor: [false],
    });
  }

  onSubmit() {
    console.log('Form Value:', this.form.value);
    console.log('Form Valid:', this.form.valid);
  }
}

