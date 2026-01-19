import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateChannelSectionComponent } from './private-channel-section';

describe('PrivateChannelSectionComponent', () => {
  let component: PrivateChannelSectionComponent;
  let fixture: ComponentFixture<PrivateChannelSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivateChannelSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PrivateChannelSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
