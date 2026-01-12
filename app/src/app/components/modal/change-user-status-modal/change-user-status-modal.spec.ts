import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeUserStatusModal } from './change-user-status-modal';

describe('ChangeUserStatusModal', () => {
  let component: ChangeUserStatusModal;
  let fixture: ComponentFixture<ChangeUserStatusModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeUserStatusModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeUserStatusModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
