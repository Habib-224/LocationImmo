import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionNewsletterComponent } from './gestion-newsletter.component';

describe('GestionNewsletterComponent', () => {
  let component: GestionNewsletterComponent;
  let fixture: ComponentFixture<GestionNewsletterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionNewsletterComponent]
    });
    fixture = TestBed.createComponent(GestionNewsletterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
