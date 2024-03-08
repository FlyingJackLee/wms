import { PreventEnterDirective } from './prevent-enter.directive';
import {Component} from "@angular/core";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";

@Component({
  standalone: true,
  template: `
    <div>
      <button preventEnter>test</button>
    </div>
  `,
  imports: [
    PreventEnterDirective
  ]
})
export class TestComponent {}

describe('PreventEnterDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component:TestComponent;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [PreventEnterDirective],
    }).createComponent(TestComponent);
    fixture.detectChanges(); // initial binding

    component = fixture.componentInstance;
  });


  it('should change button type', () => {
    const ele:HTMLButtonElement = fixture.debugElement.query(By.directive(PreventEnterDirective)).nativeElement;
    expect(ele.type).toBe("button");
  });
});
