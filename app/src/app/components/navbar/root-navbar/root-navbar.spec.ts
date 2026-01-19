import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootNavbarComponent } from './root-navbar';

describe('RootNavbarComponent', () => {
  let component: RootNavbarComponent;
  let fixture: ComponentFixture<RootNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RootNavbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RootNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
