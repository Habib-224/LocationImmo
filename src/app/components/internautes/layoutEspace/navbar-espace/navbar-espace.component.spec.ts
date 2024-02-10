import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarEspaceComponent } from './navbar-espace.component';

describe('NavbarEspaceComponent', () => {
  let component: NavbarEspaceComponent;
  let fixture: ComponentFixture<NavbarEspaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarEspaceComponent]
    });
    fixture = TestBed.createComponent(NavbarEspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
