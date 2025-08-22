import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'atom-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  animations: [
    trigger('errorMessage', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0 })),
      ]),
    ]),
  ]
})
export class InputComponent {
  @Input() label?: string;
  @Input() control!: FormControl;
  @Input() name!: string;
  @Input() placeholder: string = "";
  @Input() type: string = 'text';
  @Input() isRequired: boolean = true;
  @Input() readOnly: boolean = false;

  isPasswordVisible = false;

  get currentType(): string {
    if (this.type !== 'password') return this.type;
    return this.isPasswordVisible ? 'text' : 'password';
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  get showError(): boolean {
    return this.control && this.control.invalid && this.control.touched;
  }
}
