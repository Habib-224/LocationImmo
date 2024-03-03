// import { TestBed } from '@angular/core/testing';
// import { CanActivateFn } from '@angular/router';

// import { proprietaireGuard } from './proprietaire.guard';

// describe('proprietaireGuard', () => {
//   const executeGuard: CanActivateFn = (...guardParameters) =>
//       TestBed.runInInjectionContext(() => proprietaireGuard(...guardParameters));

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
import { proprietaireGuard } from './proprietaire.guard';


describe('AdminGuard', () => {
  let guard: proprietaireGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [proprietaireGuard],
    });
    guard = TestBed.inject(proprietaireGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

