import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProprioProfilComponent } from './proprio-profil.component';

describe('ProprioProfilComponent', () => {
  let component: ProprioProfilComponent;
  let fixture: ComponentFixture<ProprioProfilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProprioProfilComponent]
    });
    fixture = TestBed.createComponent(ProprioProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
