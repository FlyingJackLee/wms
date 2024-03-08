import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MatToolbarModule} from "@angular/material/toolbar";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterModule, MatToolbarModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  constructor() {}
}
