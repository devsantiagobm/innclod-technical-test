import { animate, style, transition, trigger } from '@angular/animations';

interface Props {
    duration?: number
}

export function fadeInAnimation({ duration = 500 }: Props) {
    return trigger('fade-in', [
        transition(':enter', [
            style({ opacity: 0, transform: 'translateY(8px)' }),
            animate(`${duration}ms ease-out`, style({ opacity: 1, transform: 'translateY(0)' }))
        ])
    ]);
}
