import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../service/shared.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  userList: any = [];
  userId: string;
  constructor(private sharedService: SharedService, private router: Router) {
    this.getAllUsers();
  }

  ngOnInit(): void {

    this.getAllUsers();
    //this.deleteUserDetail(this.userId);
    
  }
  getAllUsers() {

    this.sharedService.getUsers().subscribe(data => {
      this.userList = data;

    },
      error => {
      });
  }

  getUserDetail(userId) {
  
    this.router.navigate(['/user/edit', userId]);

  }
 
  deleteUser(userId) {
    console.log(userId);
    this.sharedService.deleteUserById(userId).subscribe(result => {
      console.log(result);

    })
    this.userList = this.userList.filter(item => item.id !== userId);
  }
  
}
