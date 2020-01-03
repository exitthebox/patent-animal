import { TestBed } from '@angular/core/testing';
// import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthService } from './auth.service';
import { TestImportsModule } from './../../test-imports/test-imports.module';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      TestImportsModule,
      // Routes
    ]
  }));

  // it('should be created', () => {
  //   const service: AuthService = TestBed.get(AuthService);
  //   expect(service).toBeTruthy();
  // });
});
