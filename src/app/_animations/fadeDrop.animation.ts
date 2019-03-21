import { trigger, state, animate, transition, style, stagger, query, animateChild } from '@angular/animations';

export const fadeDropAnimation =
  trigger('drop', [
    transition('* <=> *', [
      query('*', [
        style({
          transform: 'translateY(-25%)',
          opacity: 0
        }),
        stagger('200ms', [
          animate('500ms ease-in-out', style({
            transform: 'translateY(5%)',
            opacity: 1
          }))
        ]),
        stagger('100ms', [
          animate('500ms ease-in-out', style({
            transform: 'translateY(-7%)',
          }))
        ]),
        stagger('100ms', [
          animate('500ms ease-in-out', style('*'))
        ]),
      ])
    ])
  ]);
