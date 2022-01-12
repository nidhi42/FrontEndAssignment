import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { SharedService } from '../../../service/shared.service';
import { User } from '../../_models/users';
@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.scss']
})
export class UsersAddComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  userDetail: any = {};
  userId;
  /**
   * Creates an instance of documenter.
   */
  constructor(private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private fb: FormBuilder, private http: HttpClient, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get("id");
    if (this.userId !== null) {
      this.getUserDetail(this.userId);
    }
    else {
      this.userDetail = {}
    }
  }
  /**
   * Get User Detail
   */
  getUserDetail(userId) {
    this.sharedService.getUserById(userId).subscribe(result => {
      this.userDetail = result;
    });
  }

  /**
   * Update Users Details
   */
  updateUserDetail() {
    this.sharedService.updateUserById(this.userId, this.userDetail).subscribe(result => {
      this.toastr.success('User Updated Successfully!');
      this.userDetail = result;
    }, error => {
      this.toastr.error(error);
    });
  }

  /**
   * On Submit add users and redirect to list page.
  */
  onSubmit() {
    this.sharedService.addUser(this.userDetail).subscribe((users) => {
      this.userDetail = users;
    }, error => {
      this.toastr.error(error);
    });
    this.updateUserDetail();
    this.router.navigate(['/user']);
  }
}
