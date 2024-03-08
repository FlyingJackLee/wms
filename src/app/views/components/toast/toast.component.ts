import {CommonModule} from '@angular/common';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

export type Level = "" | "success" | "information" | "warning" | "error";

@Component({
  selector: 'toast',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {
  @Input() level!: Level;
  @Input() message!: string;

  @Output() clean = new EventEmitter();

  bg_color_map = {
    success: "rgba(183, 235, 143, 0.6",
    information: "rgba(145, 202, 255, 0.6)",
    warning: "rgba(255, 229, 143, 0.6)" ,
    error: "rgba(255, 204, 199, 0.6)"
  }

  main_color_map = {
    success: "#52C41A",
    information: "#1677FF",
    warning: "#FAAD14" ,
    error: "#FF4D4F"
  }

  icon_map = {
    success: "check_circle",
    information: "info",
    warning: "warning" ,
    error: "cancel"
  }
}
