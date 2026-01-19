import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelAsideComponent } from './channel-aside';

describe('ChannelAsideComponent', () => {
  let component: ChannelAsideComponent;
  let fixture: ComponentFixture<ChannelAsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChannelAsideComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChannelAsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
