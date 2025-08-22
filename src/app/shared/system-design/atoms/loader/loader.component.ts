import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'atom-loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {
  @Input() size!: string | number;
  @Input() color!: string;

  @HostBinding('style.--size') get computedWidth(): string {
    const DEFAULT_SIZE = '28px';

    if (typeof this.size === 'number') return `${this.size}px`;
    if (typeof this.size === 'string') return this.size;

    return DEFAULT_SIZE;
  }

  @HostBinding('style.--color') get computedColor(): string {
    return this.color;
  }
}
