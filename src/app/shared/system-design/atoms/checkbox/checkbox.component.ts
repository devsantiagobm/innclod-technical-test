import { Component, Input } from '@angular/core';

@Component({
  selector: 'atom-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss'
})
export class CheckboxComponent {
  @Input() isChecked = false;
}
