import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootAside } from './root-aside';

describe('RootAside', () => {
  let component: RootAside;
  let fixture: ComponentFixture<RootAside>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RootAside]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RootAside);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
