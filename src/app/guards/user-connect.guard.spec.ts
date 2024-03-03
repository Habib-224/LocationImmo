// import { TestBed } from '@angular/core/testing';
// import { CanActivateFn } from '@angular/router';

// import { userConnectGuard } from './user-connect.guard';

// describe('userConnectGuard', () => {
//   const executeGuard: CanActivateFn = (...guardParameters) =>
//       TestBed.runInInjectionContext(() => userConnectGuard(...guardParameters));

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//   });

//   it('should be created', () => {
//     expect(executeGuard).toBeTruthy();
//   });
// });

import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
// import { etudiantGuard } from './etudiant.guard';
// import { proprietaireGuard } from './proprietaire.guard';
import { userConnectGuard } from './user-connect.guard';


describe('AdminGuard', () => {
  let guard: userConnectGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [userConnectGuard],
    });
    guard = TestBed.inject(userConnectGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});


