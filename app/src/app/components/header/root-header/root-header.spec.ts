import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootHeader } from './root-header';

describe('Navbar', () => {
  let component: RootHeader;
  let fixture: ComponentFixture<RootHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RootHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(RootHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
