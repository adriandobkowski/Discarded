import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFooterComponent } from './profile-footer';

describe('ProfileFooterComponent', () => {
  let component: ProfileFooterComponent;
  let fixture: ComponentFixture<ProfileFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileFooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
