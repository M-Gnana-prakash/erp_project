import { Component, signal } from '@angular/core';
import { CheckboxControlValueAccessor, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  name = signal<string>("");
  email = signal<string>("");
  password = signal<string>("");

  isSubmitted = signal<boolean>(false);

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: [this.name(), Validators.required],
      email: [this.email(), Validators.required],
      password: [this.password(), Validators.required],
      phone: ['', Validators.required],
      dob: ['', Validators.required],
      description: [''],
      gender: ['', Validators.required],
      isAgreed: [false, Validators.requiredTrue],
      time: [''],
      dateRange: [''],
      CheckboxControlValueAccessor: [false, Validators.requiredTrue],
    });
  }

  handleStatusChange(controlName: string, event: any) {
    const control = this.form.get(controlName);
    if (control) {
      control.setValue(event.value, { emitEvent: false });
      if (!event.valid) {
        control.setErrors({ customError: true });
      } else {
        control.setErrors(null);
      }
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.isSubmitted.set(true);
    }
  }
}

