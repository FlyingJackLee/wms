import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {UserProfile} from "../../../../../models/profile";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {PreventEnterDirective} from "../../../../../directives/prevent-enter.directive";
import {GroupService} from "../../../../../services/group.service";
import {finalize} from "rxjs";
import {ToastService} from "../../../../../services/toast.service";


@Component({
  selector: 'app-dialog-agree',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
    MatCheckboxModule,
    PreventEnterDirective
  ],
  templateUrl: './dialog-agree.component.html',
  styleUrl: './dialog-agree.component.scss'
})
export class DialogAgreeComponent {
  permissions = this._formBuilder.group({
    shopping: true,
    inventory: true,
    statistics: true
  });

  loading: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {user: UserProfile},
              private _formBuilder: FormBuilder,
              private groupService: GroupService,
              private toast: ToastService) {
  }

  agree() {
    if (this.data.user.userId > 0){
      this.loading = true;
      this.groupService.agreeRequest(
        this.data.user.userId,
        this.permissions.value.shopping!,
        this.permissions.value.inventory!,
        this.permissions.value.statistics!,
      ).pipe(finalize(()=> this.loading = false)).subscribe({
        complete: () => {
          this.toast.push("添加员工成功，通知他刷新页面或者重新登陆即可生效", "success");
          location.reload();
        }
      });
    }
  }
}
