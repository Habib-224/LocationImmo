import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspacePersonnelleAlertsComponent } from './espace-personnelle-alerts.component';

describe('EspacePersonnelleAlertsComponent', () => {
  let component: EspacePersonnelleAlertsComponent;
  let fixture: ComponentFixture<EspacePersonnelleAlertsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EspacePersonnelleAlertsComponent]
    });
    fixture = TestBed.createComponent(EspacePersonnelleAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
