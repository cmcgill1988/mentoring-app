import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurePageComponent } from './secure-page.component';

describe('SecurePageComponent', () => {
  let component: SecurePageComponent;
  let fixture: ComponentFixture<SecurePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
