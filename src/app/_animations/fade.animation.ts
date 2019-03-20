import { trigger, state, animate, transition, style, stagger, query, animateChild, keyframes } from '@angular/animations';

export const fadeAnimation =
    trigger('fade', [
        transition('* <=> *', [
            query('*', [
                style({ opacity: 0 }),
                stagger('100ms', [
                    animate('300ms', style('*'))
                ])
            ])
        ])
    ]);

export const pulseAnimtation =
    trigger('pulse', [
        animate('5s', keyframes([
            style({ transform: 'scale3d(1, 1, 1)', }),
            style({ transform: 'scale3d(1.05, 1.05, 1.05)', }),
            style({ transform: ' transform: scale3d(1, 1, 1)', })
        ]))
    ]);
