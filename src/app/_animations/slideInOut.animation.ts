import {
    trigger,
    state,
    style,
    animate,
    transition,
    query,
    stagger,
} from '@angular/animations';

export const slideInOutAnimation =
    trigger('slideInOutAnimation', [
        transition('* <=> *', [
            query(':enter',
                style({
                    position: 'fixed',
                    width: '100%',
                    transform: 'translateX(-100%)'
                })),
            query(':leave',
                stagger('600ms', [
                    animate('500ms ease',
                        style({
                            position: 'fixed',
                            width: '100%',
                            transform: 'translateX(100%)'
                        })
                    ),
                ])),
            query(':enter',
                stagger('600ms', [
                    animate('500ms ease',
                        style({
                            opacity: 1,
                            transform: 'translateX(0%)'
                        })
                    )
                ])),
        ])
    ]);