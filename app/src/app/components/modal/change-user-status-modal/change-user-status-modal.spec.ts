import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeUserStatusModalComponent } from './change-user-status-modal';

describe('ChangeUserStatusModalComponent', () => {
  let component: ChangeUserStatusModalComponent;
  let fixture: ComponentFixture<ChangeUserStatusModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeUserStatusModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeUserStatusModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
