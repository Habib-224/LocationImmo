// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { HttpClientModule } from '@angular/common/http';
// import { AuthentificationComponent } from './authentification.component';
// import { HeaderComponent } from '../../layouts/header/header.component';

// describe('AuthentificationComponent', () => {
//   let component: AuthentificationComponent;
//   let fixture: ComponentFixture<AuthentificationComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [AuthentificationComponent, HeaderComponent], // Déclarer HeaderComponent ici
//       imports: [HttpClientModule],
//     }).compileComponents(); // Attendre la compilation des composants
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(AuthentificationComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });


import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importez le module HttpClientTestingModule
import { AuthserviceService } from 'src/app/services/serviceauth/authservice.service';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/message/message.service';
import { AuthentificationComponent } from './authentification.component';
import { HeaderComponent } from '../../layouts/header/header.component';


describe('AuthentificationComponent', () => {
  let component: AuthentificationComponent;
  let authService: AuthserviceService;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [AuthentificationComponent, HeaderComponent],
      imports: [HttpClientTestingModule], // Importez HttpClientTestingModule
      providers: [
        AuthserviceService,
        { provide: Router, useValue: routerSpyObj },
        MessageService,
      ],
    });
    component = TestBed.createComponent(
      AuthentificationComponent
    ).componentInstance;
    authService = TestBed.inject(AuthserviceService);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to dashboard_statistic for admin user', () => {
    spyOn(component, 'validateEmail').and.returnValue(true);
    spyOn(component, 'validatePassword').and.returnValue(true);
    spyOn(localStorage, 'setItem');
    // spyOn(component.message, 'MessageSucces');

    component.emailLogin = 'test@example.com';
    component.PasswordLogin = 'password';
    component.login();

    // Vos attentes ici...
  });

  // Écrivez des tests similaires pour d'autres scénarios...
});



