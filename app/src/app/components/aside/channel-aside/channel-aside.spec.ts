import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelAside } from './channel-aside';

describe('ChannelAside', () => {
  let component: ChannelAside;
  let fixture: ComponentFixture<ChannelAside>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChannelAside]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChannelAside);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
