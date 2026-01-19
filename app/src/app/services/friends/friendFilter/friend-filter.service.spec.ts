import { TestBed } from '@angular/core/testing';

import { FriendFilterService } from './friend-filter.service';

describe('FriendFilterService', () => {
  let service: FriendFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FriendFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
