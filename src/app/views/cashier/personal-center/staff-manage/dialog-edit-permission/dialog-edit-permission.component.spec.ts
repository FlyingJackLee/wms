import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditPermissionComponent } from './dialog-edit-permission.component';

describe('DialogEditPermissionComponent', () => {
  let component: DialogEditPermissionComponent;
  let fixture: ComponentFixture<DialogEditPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEditPermissionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogEditPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
