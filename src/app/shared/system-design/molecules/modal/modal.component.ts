import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'molecule-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  animations: [
    trigger('modal', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('250ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate('250ms ease-in', style({ opacity: 0, transform: 'scale(0.95)' })),
      ]),
    ]),
  ]
})
export class ModalComponent {
  @Input() isVisible = false;
  @Output() close = new EventEmitter<void>()

  @HostListener('document:keydown.escape')
  public onEscape() {
    if (this.isVisible) this.close.emit();
  }

  public closeModal(){
    this.close.emit()
  }
}
