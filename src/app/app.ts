import { Component, signal } from '@angular/core';
import { McvInputField } from "./shared/components/form/mcv-input-field/mcv-input-field";
import { McvEmailField } from "./shared/components/form/mcv-email-field/mcv-email-field";
import { McvTimePicker } from './shared/components/form/mcv-time-picker/mcv-time-picker';
import { McvDateRangePicker } from './shared/components/form/mcv-date-range-picker/mcv-date-range-picker';
import { McvCheckbox } from './shared/components/form/mcv-checkbox/mcv-checkbox';

@Component({
  selector: 'app-root',
  imports: [McvInputField, McvEmailField,McvTimePicker,McvDateRangePicker,McvCheckbox],
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

  onStatusChange(event: any) {
    console.log(event);
  }
}
