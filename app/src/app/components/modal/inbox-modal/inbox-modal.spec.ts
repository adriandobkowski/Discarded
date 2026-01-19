import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxModalComponent } from './inbox-modal';

describe('InboxModalComponent', () => {
  let component: InboxModalComponent;
  let fixture: ComponentFixture<InboxModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InboxModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InboxModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
