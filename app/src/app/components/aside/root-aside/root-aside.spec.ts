import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootAsideComponent } from './root-aside';

describe('RootAsideComponent', () => {
  let component: RootAsideComponent;
  let fixture: ComponentFixture<RootAsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RootAsideComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RootAsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
