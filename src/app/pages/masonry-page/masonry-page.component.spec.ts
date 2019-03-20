import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasonryPageComponent } from './masonry-page.component';

describe('MasonryPageComponent', () => {
  let component: MasonryPageComponent;
  let fixture: ComponentFixture<MasonryPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasonryPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasonryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
