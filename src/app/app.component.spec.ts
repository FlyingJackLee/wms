import {ComponentFixture, TestBed} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {ToastService} from "./services/toast.service";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    const toastSpy = jasmine.createSpy('ToastService');
    TestBed.configureTestingModule({
      providers: [{ provide: ToastService, useValue: toastSpy }]}
    );

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it(`should have as title 'wms'`, () => {
    expect(component.title).toEqual('首页');
  });


});
