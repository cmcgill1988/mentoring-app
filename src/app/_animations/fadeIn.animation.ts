import { trigger, state, animate, transition, style } from '@angular/animations';

export const fadeInAnimation =
    trigger('fadeInAnimation', [
        transition(':enter', [
            style({ opacity: 0 }),
            animate('1.2s 200ms', style({ opacity: 1 }))
        ]),
    ]);