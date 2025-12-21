import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootLayout } from './root-layout';

describe('RootLayout', () => {
  let component: RootLayout;
  let fixture: ComponentFixture<RootLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RootLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RootLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
