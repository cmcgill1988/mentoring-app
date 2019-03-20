import { trigger, state, animate, transition, style, query, stagger, group, animateChild } from '@angular/animations';

export const routerAnimation =
    trigger('routerAnimation', [
        transition('* <=> *', [
            query(':enter, :leave', style({ position: 'absolute', left: '0%' })),
            query(':enter', style({ left: '100%' })),
            group([
                query(':leave', group([
                    animateChild(),
                    animate('1200ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 0, left: '-100%' }))
                ]), { optional: true }),
                query(':enter', group([
                    animate('1200ms cubic-bezier(0.35, 0, 0.25, 1)', style('*')),
                    animateChild()
                ]), { delay: 200 }),
            ])
        ])
    ])