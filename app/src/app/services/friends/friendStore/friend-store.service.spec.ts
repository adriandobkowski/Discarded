import { TestBed } from '@angular/core/testing';

import { FriendStoreService } from './friend-store.service';

describe('FriendStoreService', () => {
  let service: FriendStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FriendStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
