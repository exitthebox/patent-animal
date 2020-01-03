import { TestBed } from '@angular/core/testing';

import { InterceptorService } from './interceptor.service';
import { RouterModule } from '@angular/router';
// import { TestImportsModule } from '../../test-imports/test-imports.module';

describe('InterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      RouterModule,
      // Routes
    ],
    imports: [
      RouterModule
    ]
  }));

  it('should be created', () => {
    const service: InterceptorService = TestBed.get(InterceptorService);
    expect(service).toBeTruthy();
  });
});
