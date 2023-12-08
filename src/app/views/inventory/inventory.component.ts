import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {
  constructor(private toastService:ToastService) {}

  test() {
    this.toastService.push("this is just a test", "error");
  }
}
