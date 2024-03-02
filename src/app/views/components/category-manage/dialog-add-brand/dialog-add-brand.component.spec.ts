import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddBrandComponent } from './dialog-add-brand.component';

describe('DialogAddBrandComponent', () => {
  let component: DialogAddBrandComponent;
  let fixture: ComponentFixture<DialogAddBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAddBrandComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogAddBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
