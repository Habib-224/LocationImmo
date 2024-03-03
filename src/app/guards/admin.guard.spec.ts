// import { TestBed } from '@angular/core/testing';
// import { CanActivateFn } from '@angular/router';

// import { adminGuard } from './admin.guard';

// describe('adminGuard', () => {
//   const executeGuard: CanActivateFn = (...guardParameters) =>
//       TestBed.runInInjectionContext(() => adminGuard(...guardParameters));

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//   });

//   it('should be created', () => {
//     expect(executeGuard).toBeTruthy();
//   });
// });
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { adminGuard } from './admin.guard';

describe('AdminGuard', () => {
  let guard: adminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [adminGuard],
    });
    guard = TestBed.inject(adminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
