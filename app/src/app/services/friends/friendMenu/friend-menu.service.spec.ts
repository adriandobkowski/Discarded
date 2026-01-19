import { TestBed } from '@angular/core/testing';

import { FriendMenuService } from './friend-menu.service';

describe('FriendMenuService', () => {
  let service: FriendMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FriendMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
