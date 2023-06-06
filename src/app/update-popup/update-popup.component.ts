import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-update-popup',
  templateUrl: './update-popup.component.html',
  styleUrls: ['./update-popup.component.css']
})
export class UpdatePopupComponent implements OnInit {
  editData: any;
  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router,
    private dialog:MatDialogRef<UpdatePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  roleList: any;

  ngOnInit(): void {

    this.service.getAllRole().subscribe(role => {
      this.roleList = role;
    })

    if (this.data.usercode != null && this.data.usercode != '') {
      this.service.getById(this.data.usercode).subscribe(res => {
        this.editData = res;
        this.updateForm.setValue({ id: this.editData.id, name: this.editData.name, email: this.editData.email, password: this.editData.password, role: this.editData.role, gender: this.editData.gender, isActive: this.editData.isActive })
      });
    }
  }


  updateForm = this.builder.group({
    id: this.builder.control(''),
    name: this.builder.control(''),
    password: this.builder.control(''),
    email: this.builder.control(''),
    gender: this.builder.control('male'),
    role: this.builder.control('', Validators.required),
    isActive: this.builder.control(false)
  });

  updateUser() {
    if (this.updateForm.valid) {
      this.service.updateUser(this.updateForm.value.id, this.updateForm.value).subscribe(data => {
        this.toastr.success('Updated Successfully');
        this.dialog.close();
      })
    }
    else {
      this.toastr.warning('Please Select Role')
    }
    this.service.updateUser
  }
}
