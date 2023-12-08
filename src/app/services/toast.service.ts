import { Injectable, ViewChild } from '@angular/core';
import { Level, ToastComponent } from '../views/components/toast/toast.component';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  message!:string;
  level!: Level;

  constructor() { }

  push(message:string, level: Level, duration: number = 3000) {
    this.message = message;
    this.level = level;

    setTimeout(() => this.clear(), duration);
  }

  clear(){
    this.message = "";
    this.level = ""
  }
}
