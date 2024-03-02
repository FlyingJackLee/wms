import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogReturnConfirmComponent } from './dialog-return-confirm.component';

describe('DialogReturnConfirmComponent', () => {
  let component: DialogReturnConfirmComponent;
  let fixture: ComponentFixture<DialogReturnConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogReturnConfirmComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogReturnConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
