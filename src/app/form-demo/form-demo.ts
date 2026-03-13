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
import { SttService } from '../shared/services/stt.service';

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
  isListening = signal<boolean>(false);
  currentTranscript = signal<string>("");
  recognition: any;

  form: FormGroup;

  constructor(private fb: FormBuilder, private sttService: SttService) {
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
      dateRange: [{ start: null, end: null }],
      CheckboxControlValueAccessor: [false, Validators.requiredTrue],
      checkMe: [false]
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
      console.log('Form Data:', this.form.value);
      this.isSubmitted.set(true);
    }
  }

  toggleListening() {
    if (this.isListening()) {
      this.stopListening();
    } else {
      this.startListening();
    }
  }

  startListening() {
    this.isListening.set(true);
    this.currentTranscript.set("");
    this.recognition = this.sttService.recognize(
      (text) => {
        this.currentTranscript.set(text);
        this.handleVoiceCommand(text);
        // Log to backend
        this.sttService.saveTranscription(text, 'basic-form-global', 'multiple-fields');
      },
      () => {
        this.isListening.set(false);
        this.currentTranscript.set("");
      },
      true // Continuous
    );
  }

  stopListening() {
    if (this.recognition) {
      this.recognition.stop();
    }
    this.isListening.set(false);
  }

  handleVoiceCommand(text: string) {
    const lowerText = text.toLowerCase();

    // Keywords mapping
    const mapping: { [key: string]: string } = {
      'name': 'name',
      'email': 'email',
      'password': 'password',
      'phone number': 'phone',
      'phone': 'phone',
      'date of birth': 'dob',
      'dob': 'dob',
      'description': 'description',
      'time': 'time',
      'gender': 'gender',
      'subscribe': 'CheckboxControlValueAccessor',
      'agree': 'isAgreed',
      'terms': 'isAgreed',
      'date range': 'dateRange',
      'date of range': 'dateRange',
      'select date range': 'dateRange',
      'check me': 'checkMe'
    };

    // Sort keywords by length descending to match longer ones first ("phone number" before "phone")
    const keywords = Object.keys(mapping).sort((a, b) => b.length - a.length);

    // Use regex to split the text by keywords
    const keywordPattern = keywords.join('|');
    const regex = new RegExp(`\\b(${keywordPattern})\\b`, 'gi');

    const parts = text.split(regex);
    // text.split(regex) with capturing group returns: [pre, keyword1, post1, keyword2, post2, ...]

    for (let i = 1; i < parts.length; i += 2) {
      const keyword = parts[i].toLowerCase();
      const value = parts[i + 1]?.trim();
      const controlName = mapping[keyword];

      if (controlName && value) {
        this.fillField(controlName, value);
      }
    }
  }

  fillField(controlName: string, value: string) {
    const control = this.form.get(controlName);
    if (!control) return;

    let processedValue: any = value;

    if (controlName === 'phone') {
      processedValue = this.sttService.parseNumber(value).replace(/\s/g, '');
    } else if (controlName === 'dob') {
      const date = new Date(this.cleanDateStr(value));
      if (!isNaN(date.getTime())) {
        processedValue = this.formatDateLocal(date);
      }
    } else if (controlName === 'description') {
      processedValue = this.sttService.parsePunctuation(value);
    } else if (controlName === 'time') {
      processedValue = this.parseTime(value);
    } else if (controlName === 'dateRange') {
      processedValue = this.parseDateRange(value);
    } else if (controlName === 'gender') {
      if (value.toLowerCase().includes('male')) processedValue = 'male';
      else if (value.toLowerCase().includes('female')) processedValue = 'female';
      else if (value.toLowerCase().includes('other')) processedValue = 'other';
    } else if (controlName === 'CheckboxControlValueAccessor' || controlName === 'isAgreed') {
      processedValue = value.toLowerCase().includes('yes') || value.toLowerCase().includes('true') || value.toLowerCase().includes('enable') || value.toLowerCase().includes('on');
    }

    if (processedValue !== undefined && processedValue !== null) {
      control.setValue(processedValue);
      control.markAsDirty();
      control.markAsTouched();
    }
  }

  parseTime(timeStr: string): string {
    // Basic time parsing for "3 PM", "10:30 AM", etc.
    const match = timeStr.match(/(\d+)(?::(\d+))?\s*(AM|PM)?/i);
    if (!match) return timeStr;

    let hours = parseInt(match[1]);
    const minutes = match[2] ? parseInt(match[2]) : 0;
    const ampm = match[3] ? match[3].toUpperCase() : null;

    if (ampm === 'PM' && hours < 12) hours += 12;
    if (ampm === 'AM' && hours === 12) hours = 0;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

  parsePassword(passwordStr: string): string {
    // Replace spelled out special characters with actual symbols
    const specialCharMap: { [key: string]: string } = {
      'at': '@',
      'dot': '.',
      'underscore': '_',
      'dash': '-',
      'hyphen': '-',
      'ampersand': '&',
      'plus': '+',
      'equals': '=',
      'slash': '/',
      'backslash': '\\'
    };

    // Split by spaces and process each part
    const parts = passwordStr.split('');
    let result = '';

    for (const part of parts) {
      const lowerPart = part.toLowerCase();

      if (specialCharMap[lowerPart]) {
        result += specialCharMap[lowerPart];
      } else if (lowerPart === 'space') {
        result += '';
      } else {
        result += part;
      }
    }

    return result;
  }

  parseDateRange(text: string): { start: Date | null, end: Date | null } {
    let parts: string[] = [];
    if (text.includes(' to ')) {
      parts = text.split(/\bto\b/);
    } else if (text.includes(' and ')) {
      parts = text.split(/\band\b/);
    } else if (text.includes(' - ')) {
      parts = text.split(' - ');
    }

    if (parts.length >= 2) {
      const startStr = this.cleanDateStr(parts[0].replace(/\bfrom\b/, ''));
      const endStr = this.cleanDateStr(parts[1]);

      const startDate = new Date(startStr);
      const endDate = new Date(endStr);

      return {
        start: isNaN(startDate.getTime()) ? null : startDate,
        end: isNaN(endDate.getTime()) ? null : endDate
      };
    }

    return { start: null, end: null };
  }

  // Helpers to fix date issues
  private formatDateLocal(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private cleanDateStr(str: string): string {
    return str
      .toLowerCase()
      .replace(/(\d+)(st|nd|rd|th)/g, '$1') // Remove 1st, 2nd, etc.
      .trim();
  }
}

