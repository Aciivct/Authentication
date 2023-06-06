import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { UpdatePopupComponent } from '../update-popup/update-popup.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  constructor(private service: AuthService, private dialog: MatDialog) { this.onLoad(); }

  displayedColumns: string[] = ['username', 'name', 'email', 'role', 'status', 'action'];
  userList: any;
  allUser: any;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  onLoad() {
    this.service.getAll().subscribe(data => {
      this.userList = data;
      this.allUser = new MatTableDataSource(this.userList);
      this.allUser.paginator = this.paginator;
      this.allUser.sort = this.sort;
    })
  }
  updateUser(id: any) {
   const popup= this.dialog.open(UpdatePopupComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      width: '50%',
      data: { usercode: id }
    })
    popup.afterClosed().subscribe(res=>{this.onLoad();})
  }
  openDialog(){}
}
