import {Component, OnInit} from '@angular/core';
import {ToastService} from "./services/toast.service";
import packageJson from '../../package.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations:[]
})
export class AppComponent implements OnInit{
  title = '首页';
  public version: string = packageJson.version;

  constructor(public toastService:ToastService){}

  ngOnInit() {
    console.log("Current version is " + this.version);
  }

  clear() {
    this.toastService.clear();
  }
}

