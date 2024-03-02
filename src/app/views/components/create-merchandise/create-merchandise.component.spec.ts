import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMerchandiseComponent } from './create-merchandise.component';

describe('CreateMerchandiseComponent', () => {
  let component: CreateMerchandiseComponent;
  let fixture: ComponentFixture<CreateMerchandiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateMerchandiseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateMerchandiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
