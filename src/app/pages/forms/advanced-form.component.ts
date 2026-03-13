import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SttService } from '../../shared/services/stt.service';

// Shared Components
import { McvInputField } from '../../shared/components/form/mcv-input-field/mcv-input-field';
import { McvTextArea } from '../../shared/components/form/mcv-text-area/mcv-text-area';

@Component({
  selector: 'app-advanced-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    McvInputField,
    McvTextArea
  ],
  templateUrl: './advanced-form.component.html'
})
export class AdvancedFormComponent {
  form: FormGroup;
  
  // Status signals
  isListeningGlobal = signal<boolean>(false);
  activeField = signal<string | null>(null);
  isProcessing = signal<boolean>(false);
  statusMessage = signal<string>("Ready for voice input");
  suggestions = signal<string[]>([]);
  
  constructor(private fb: FormBuilder, private sttService: SttService) {
    this.form = this.fb.group({
      patientName: [''],
      age: [''],
      gender: [''],
      clinicalHistory: [''],
      technique: [''],
      findings: [''],
      impression: ['']
    });
  }

  handleStatusChange(controlName: string, event: any) {
    const control = this.form.get(controlName);
    if (control) {
      control.setValue(event.value, { emitEvent: false });
    }
  }

  // --- Voice Control Logic ---

  async toggleGlobalMic() {
    if (this.isListeningGlobal()) {
      this.sttService.stop();
    } else {
      this.startGlobalRecording();
    }
  }

  startGlobalRecording() {
    this.isListeningGlobal.set(true);
    this.statusMessage.set("Listening (Whole Form)... Speak keywords like 'Name', 'Age', 'Findings'.");
    
    this.sttService.recognize(
      (text) => {
        this.statusMessage.set("Heard: " + text);
        this.parseGlobalTranscription(text);
        // Log to backend
        this.sttService.saveTranscription(text, 'adv-form-global', 'multiple-fields');
      },
      () => {
        this.isListeningGlobal.set(false);
        this.statusMessage.set("Global Mic stopped.");
      },
      true // continuous
    );
  }

  async toggleFieldMic(fieldName: string) {
    if (this.activeField() === fieldName) {
      this.sttService.stop();
    } else {
      // Stop anything else first
      this.sttService.stop();
      this.startFieldRecording(fieldName);
    }
  }

  startFieldRecording(fieldName: string) {
    this.activeField.set(fieldName);
    this.statusMessage.set(`Recording for ${fieldName}...`);
    
    this.sttService.recognize(
      (text) => {
        this.form.get(fieldName)?.setValue(text);
        this.statusMessage.set(`Filling ${fieldName}...`);
        // Log to backend
        this.sttService.saveTranscription(text, 'adv-form-field', fieldName);
      },
      () => {
        this.activeField.set(null);
        this.statusMessage.set(`${fieldName} input stopped.`);
      },
      true // continuous
    );
  }

  parseGlobalTranscription(text: string) {
    const mapping: { [key: string]: string } = {
      'patient name': 'patientName',
      'name': 'patientName',
      'age': 'age',
      'gender': 'gender',
      'clinical history': 'clinicalHistory',
      'history': 'clinicalHistory',
      'findings': 'findings',
      'finding': 'findings',
      'technique': 'technique',
      'method': 'technique',
      'clinical impression': 'impression',
      'impression': 'impression'
    };

    const keywords = Object.keys(mapping).sort((a, b) => b.length - a.length);
    const pattern = keywords.join('|');
    const regex = new RegExp(`\\b(${pattern})\\b`, 'gi');

    const parts = text.split(regex);
    let found = false;

    for (let i = 1; i < parts.length; i += 2) {
      const key = parts[i].toLowerCase();
      const val = parts[i + 1]?.trim();
      const control = mapping[key];
      if (control && val) {
        this.form.get(control)?.setValue(val);
        found = true;
      }
    }

    if (!found) {
      this.statusMessage.set("No keywords recognized. Try saying 'History [text] Findings [text]'.");
    }
  }

  async onSubmit() {
    if (this.form.invalid) {
      this.statusMessage.set("Please fill the required fields.");
      return;
    }

    this.isProcessing.set(true);
    this.statusMessage.set("Saving prescription to database...");

    try {
      // Direct call to the new prescription endpoint
      const response = await fetch('http://localhost:8000/api/save_prescription.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.form.value)
      });
      
      const result = await response.json();
      
      if (result.status === 'success') {
        this.statusMessage.set("Prescription #"+result.id+" saved successfully!");
        this.form.reset();
      } else {
        this.statusMessage.set("Save failed: " + result.message);
      }
    } catch (err) {
      this.statusMessage.set("Network error: Could not save data.");
    } finally {
      this.isProcessing.set(false);
    }
  }

  applySuggestion(text: string) {
    this.parseGlobalTranscription(text);
    this.suggestions.set([]);
  }
}
