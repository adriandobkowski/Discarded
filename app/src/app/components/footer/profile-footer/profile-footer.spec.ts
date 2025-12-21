import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFooter } from './profile-footer';

describe('ProfileFooter', () => {
  let component: ProfileFooter;
  let fixture: ComponentFixture<ProfileFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileFooter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileFooter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
