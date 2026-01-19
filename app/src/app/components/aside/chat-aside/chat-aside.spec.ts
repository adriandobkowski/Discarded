import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatAsideComponent } from './chat-aside';

describe('ChatAsideComponent', () => {
  let component: ChatAsideComponent;
  let fixture: ComponentFixture<ChatAsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatAsideComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatAsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
