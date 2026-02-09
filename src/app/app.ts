import { Component, signal } from '@angular/core';
import { McvInputField } from "./shared/components/form/mcv-input-field/mcv-input-field";
import { McvEmailField } from "./shared/components/form/mcv-email-field/mcv-email-field";
import { McvPhoneField } from "./shared/components/form/mcv-phone-field/mcv-phone-field";
import { McvTextArea } from "./shared/components/form/mcv-text-area/mcv-text-area";
import { McvDatePicker } from "./shared/components/form/mcv-date-picker/mcv-date-picker";

@Component({
  selector: 'app-root',
  imports: [McvInputField, McvEmailField, McvPhoneField, McvTextArea, McvDatePicker],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ErpProject');

  email = signal<string>('');
  name = signal<string>('');
  phone = signal<string>('');
  description = signal<string>('');
  birthDate = signal<string>('');

  onStatusChange(event: any) {
    console.log(event);
  }
}
