import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { productIdGuard } from './product-id.guard';

describe('productIdGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => productIdGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
