import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChannelModal } from './create-channel-modal';

describe('CreateChannelModal', () => {
  let component: CreateChannelModal;
  let fixture: ComponentFixture<CreateChannelModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateChannelModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateChannelModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
