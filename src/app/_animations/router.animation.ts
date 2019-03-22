import { trigger, animate, transition, style, query, group, animateChild } from '@angular/animations';
const optional = { optional: true };
export const routerAnimation =
  trigger('routerAnimation', [
    transition('* <=> *', [
      query(':enter, :leave', style({ position: 'absolute', left: '0%' }), optional),
      query(':enter', style({ left: '100%' }), optional),
      group([
        query(':leave', group([
          animateChild(),
          animate('1200ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 0, left: '-100%' }))
        ]), optional),
        query(':enter', group([
          animate('1200ms cubic-bezier(0.35, 0, 0.25, 1)', style('*')),
          animateChild()
        ]), { delay: 200, optional: true }),
      ])
    ])
  ])