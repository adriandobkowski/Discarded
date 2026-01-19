import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarAddFriendComponent } from './navbar-add-friend';

describe('NavbarAddFriendComponent', () => {
  let component: NavbarAddFriendComponent;
  let fixture: ComponentFixture<NavbarAddFriendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarAddFriendComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarAddFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
