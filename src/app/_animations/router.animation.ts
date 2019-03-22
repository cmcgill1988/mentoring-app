import { trigger, state, animate, transition, style, query, stagger, group, animateChild } from '@angular/animations';

export const routerAnimation =
  trigger('routerAnimation', [
    transition('* => isLeft', slideTo('left')),
    transition('* => isRight', slideTo('right')),
    transition('isRight => *', slideTo('left')),
    transition('isLeft => *', slideTo('right'))
  ]);

function slideTo(direction) {
  const optional = { optional: true };
  return [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        [direction]: 0,
        top: 85,
        width: '100%'
      })
    ], optional),
    query(':enter', [
      style({ [direction]: '-100%', opacity: 1 })
    ]),
    group([
      query(':leave', [
        animate('600ms ease', style({ [direction]: '100%', opacity: 0 }))
      ], optional),
      query(':enter', [
        animate('600ms ease', style({ [direction]: '0%', opacity: 1 }))
      ])
    ]),
    // Normalize the page style... Might not be necessary
    query(':leave', animateChild()),
    query(':enter', animateChild()),
  ];
}
