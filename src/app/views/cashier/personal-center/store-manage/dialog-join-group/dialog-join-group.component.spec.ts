import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogJoinGroupComponent } from './dialog-join-group.component';

describe('DialogJoinGroupComponent', () => {
  let component: DialogJoinGroupComponent;
  let fixture: ComponentFixture<DialogJoinGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogJoinGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogJoinGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
