import { Component, OnInit } from '@angular/core';
import {ToastService} from "./services/toast.service";
import {Title} from "@angular/platform-browser";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations:[]
})
export class AppComponent{
  title = '首页';
  constructor(public toastService:ToastService){}

  clear() {
    this.toastService.clear();
  }
}

