import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayquotesComponent } from './displayquotes.component';

describe('DisplayquotesComponent', () => {
  let component: DisplayquotesComponent;
  let fixture: ComponentFixture<DisplayquotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayquotesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayquotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});