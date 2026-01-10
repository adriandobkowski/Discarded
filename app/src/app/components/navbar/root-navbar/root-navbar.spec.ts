import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootNavbar } from './root-navbar';

describe('RootNavbar', () => {
  let component: RootNavbar;
  let fixture: ComponentFixture<RootNavbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RootNavbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RootNavbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
