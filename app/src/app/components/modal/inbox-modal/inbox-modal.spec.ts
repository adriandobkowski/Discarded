import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxModal } from './inbox-modal';

describe('InboxModal', () => {
  let component: InboxModal;
  let fixture: ComponentFixture<InboxModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InboxModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InboxModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
