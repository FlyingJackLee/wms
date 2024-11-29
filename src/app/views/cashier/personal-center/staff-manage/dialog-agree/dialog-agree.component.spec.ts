import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAgreeComponent } from './dialog-agree.component';

describe('DialogAgreeComponent', () => {
  let component: DialogAgreeComponent;
  let fixture: ComponentFixture<DialogAgreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAgreeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogAgreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
