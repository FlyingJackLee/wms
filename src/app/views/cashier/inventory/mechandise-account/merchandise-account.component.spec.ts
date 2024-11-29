import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchandiseAccountComponent } from './merchandise-account.component';

describe('MechandiseAccountComponent', () => {
  let component: MerchandiseAccountComponent;
  let fixture: ComponentFixture<MerchandiseAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MerchandiseAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchandiseAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
