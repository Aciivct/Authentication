import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  userData: any;
  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router,

  ) { }
  ngOnInit(): void {
    sessionStorage.clear;
  }

  loginForm = this.builder.group({
    username: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)
  })

  proceedLogin() {
    if (this.loginForm.valid) {
      this.service.getById(this.loginForm.value.username).subscribe(data => {
        this.userData = data;

        if (this.userData.password === this.loginForm.value.password) {
          if (this.userData.isActive == true) {
            sessionStorage.setItem('userName', this.userData.id);
            sessionStorage.setItem('userRole', this.userData.role);
            this.router.navigate(['']);
          }
          else {
            this.toastr.error('Please contact admin', 'In Active User');
          }
        }
        else {
          this.toastr.error('Invalid Credentials');
        }
      });
    }
    else {
      this.toastr.warning('Please enter valid details');
    }
  }

}
