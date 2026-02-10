import { Component, signal } from '@angular/core';
import { McvInputField } from "./shared/components/form/mcv-input-field/mcv-input-field";
import { McvEmailField } from "./shared/components/form/mcv-email-field/mcv-email-field";
import { McvTimePicker } from './shared/components/form/mcv-time-picker/mcv-time-picker';
import { McvDateRangePicker } from './shared/components/form/mcv-date-range-picker/mcv-date-range-picker';
import { McvCheckbox } from './shared/components/form/mcv-checkbox/mcv-checkbox';
import { McvPasswordField } from "./shared/components/form/mcv-password-field/mcv-password-field";
import { McvRadioField, RadioOption } from "./shared/components/form/mcv-radio-field/mcv-radio-field";
import { ToggleSwitchComponent } from "./shared/components/form/mcv-toogle-field/mcv-toogle-field";

@Component({
  selector: 'app-root',
  imports: [McvInputField, McvEmailField, McvPasswordField, McvRadioField, ToggleSwitchComponent, McvTimePicker, McvDateRangePicker, McvCheckbox],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ErpProject');

  email = signal<string>('');
  name = signal<string>('');
  time = signal<string>('');
  isChecked = signal<boolean>(false);
  dateRange = signal<{ startDate: Date | null; endDate: Date | null }>({ startDate: null, endDate: null });
  password = signal<string>('');

  radioValue = signal<string>('');
  radioOptions: RadioOption[] = [
    { label: 'O1', value: 'Option 1' },
    { label: 'O2', value: 'Option 2' },
    { label: 'O3', value: 'Option 3' },
  ];

  genderValue = signal<string>('');
  genderOptions: RadioOption[] = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' }
  ];
  selectedOption = signal<string | null>(null);

  onRadioChange(event: any) {
    this.selectedOption.set(event.value);
    console.log(event);

  }

  toggleValue = signal<boolean>(false);

  onToggleChange(event: any) {
    this.toggleValue.set(event.value);
    console.log(event);
  }

  onStatusChange(event: any) {
    console.log(event);
  }

}

