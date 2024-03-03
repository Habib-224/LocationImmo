// import { TestBed } from '@angular/core/testing';
// import { CanActivateFn } from '@angular/router';

// import { etudiantGuard } from './etudiant.guard';

// describe('etudiantGuard', () => {
//   const executeGuard: CanActivateFn = (...guardParameters) =>
//       TestBed.runInInjectionContext(() => etudiantGuard(...guardParameters));

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//   });

//   it('should be created', () => {
//     expect(executeGuard).toBeTruthy();
//   });
// });
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { etudiantGuard } from './etudiant.guard';


describe('AdminGuard', () => {
  let guard: etudiantGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [etudiantGuard],
    });
    guard = TestBed.inject(etudiantGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

