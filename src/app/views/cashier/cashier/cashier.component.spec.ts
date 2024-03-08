import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CashierComponent} from './cashier.component';
import {provideAnimations} from "@angular/platform-browser/animations";
import {RouterTestingModule} from "@angular/router/testing";

describe('CashierComponent', () => {
  let component: CashierComponent;
  let fixture: ComponentFixture<CashierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashierComponent, RouterTestingModule],
      providers: [provideAnimations()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });
});

