import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageFooter } from './message-footer';

describe('MessageFooter', () => {
  let component: MessageFooter;
  let fixture: ComponentFixture<MessageFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageFooter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageFooter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
