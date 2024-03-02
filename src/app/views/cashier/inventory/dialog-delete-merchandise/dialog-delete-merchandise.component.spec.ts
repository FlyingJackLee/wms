import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteMerchandiseComponent } from './dialog-delete-merchandise.component';

describe('DialogDeleteMerchandiseComponent', () => {
  let component: DialogDeleteMerchandiseComponent;
  let fixture: ComponentFixture<DialogDeleteMerchandiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogDeleteMerchandiseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogDeleteMerchandiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
