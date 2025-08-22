import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'atom-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() variant: 'action' | 'danger' | "square" | "outline" | "success" = 'square';
  @Input() routerLink!: string;
  @Input() disabled = false;
  @Input() isLoading = false;
  @Input() fitContent = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';


  @HostBinding("style.--width") get computedWidth() {
    return this.fitContent ? "fit-content" : "100%"
  }
}
