import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../service/shared.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  userList: any = [];
  userId: string;

  /**
   * Creates an instance of documenter.
   */
  constructor(private sharedService: SharedService, private router: Router, private toastr: ToastrService) {
    this.getAllUsers();
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  /**
  * Get User Detail
  */
  getAllUsers() {
    this.sharedService.getUsers().subscribe(data => {
      this.userList = data;
    },
      error => {
        this.toastr.error(error);
      });
  }

/**
* Redirect to User Edit Page
*/
  getUserDetail(userId) {
    this.router.navigate(['/user/edit', userId]);

  }

  deleteUser(userId) {
    this.sharedService.deleteUserById(userId).subscribe(result => {
      this.toastr.success('User Deleted!');
    }, err => {
      this.toastr.error(err);
    });

    this.userList = this.userList.filter(item => item.id !== userId);
  }

}
