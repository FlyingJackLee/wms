import { Component } from '@angular/core';
import { ToastService } from './services/toast.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[]
})
export class AppComponent {
  title = 'wms';

  isExpanded = true;

  constructor(public toastService:ToastService){}

  clear() {
    this.toastService.clear();
  }
}

