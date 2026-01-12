import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarAddFriend } from './navbar-add-friend';

describe('NavbarAddFriend', () => {
  let component: NavbarAddFriend;
  let fixture: ComponentFixture<NavbarAddFriend>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarAddFriend]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarAddFriend);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
