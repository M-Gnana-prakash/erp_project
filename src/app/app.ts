import { Component, signal } from '@angular/core';
import { McvInputField } from "./shared/components/form/mcv-input-field/mcv-input-field";
import { McvEmailField } from "./shared/components/form/mcv-email-field/mcv-email-field";

@Component({
  selector: 'app-root',
  imports: [McvInputField, McvEmailField],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ErpProject');

  email = signal<string>('');
  name = signal<string>('');

  onStatusChange(event: any) {
    console.log(event);
  }
}
