import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-mcv-checkbox',
  templateUrl: './mcv-checkbox.html',
  styleUrls: ['./mcv-checkbox.css']
})
export class McvCheckbox implements OnInit {

  // Input properties
  @Input() checked = false;
  @Input() disabled = false;
  @Input() required = false;

  // Output event
  @Output() statusChange = new EventEmitter<{
    checked: boolean;
    valid: boolean;
  }>();

  valid = false;

  // Lifecycle hook
  ngOnInit(): void {
    this.validateAndEmit();
  }

  // Method to handle checkbox toggle
  onToggle(value: boolean): void {
    this.checked = value;
    this.validateAndEmit();
  }

  // Method to validate the checkbox state and emit status
  private validateAndEmit(): void {
    this.valid = this.required ? this.checked : true;

    // Emit the current status
    this.statusChange.emit({
      checked: this.checked,
      valid: this.valid
    });
  }
}
