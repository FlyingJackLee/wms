import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateStoreComponent } from './dialog-create-store.component';

describe('DialogCreateStoreComponent', () => {
  let component: DialogCreateStoreComponent;
  let fixture: ComponentFixture<DialogCreateStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogCreateStoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogCreateStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
