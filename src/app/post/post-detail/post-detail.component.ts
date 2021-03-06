import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { filter, map, mergeMap } from 'rxjs/operators'
import { environment } from '../../../environments/environment';
import { SharedService } from '../../../service/shared.service';
@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  postId: string;
  user;
  userId;
  preUrl: string;
  userName: string;
  itemsPerSlide = 3;
  singleSlideOffset = false;
  noWrap = false;
  postComment: string;
  addedComments;
  filteredComments;
  commentId: number;
  userList: any = [];
  @Input() postDetail: any;
  @Input() comments: any;
  /**
   * Creates an instance of documenter.
   */
  constructor(private router: Router, private route: ActivatedRoute, private sharedService: SharedService, private toastr: ToastrService) {
    this.preUrl = environment.apiUrl;
  }

  /**
   * Initialize oninit 
   */
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.userId = this.user.user.id;
   
    this.postId = window.location.href.split("/")[5];

    this.postDetail.comments = this.postDetail?.comments.filter(x => x.commentText !== null);
  }
  isEditable: boolean;
  editableIndex: number;
  /**
   * Update User Comments
   */
  updateComment(comment, i) {
    this.isEditable = !this.isEditable;
    this.editableIndex = this.isEditable ? i : -1;
    if (!this.isEditable) {
      this.sharedService.updateComments(comment).subscribe(result => {
        this.toastr.success('User Comment Updated!');
      },
        err => {
          this.toastr.error(err);
        });
    }
  }

  /**
   * Delete User Comments
   */
  deleteComment(commentId) {
    this.sharedService.changeLoderStatus(true);
    this.sharedService.deleteCommentsById(commentId).toPromise().then((result) => {
      this.sharedService.changeLoderStatus(false);
      this.toastr.success('User Comment Deleted!');
    }, err => {
      this.toastr.error(err);
    });
    this.comments = this.comments.filter(item => item.id !== commentId);
    this.comments.length;
  }

  /**
   * Save User Comments
   */
  saveComment() {
    this.sharedService.changeLoderStatus(true);
    const reqObj = {
      commentText: this.postComment,
      post: this.postDetail.id,
      user: this.userId !== null ? this.userId : "",
      created_by: '',
      updated_by: ''
    }
    this.sharedService.addComment(reqObj).toPromise().then((result) => {
      this.sharedService.changeLoderStatus(false);
      this.toastr.success('User Comment Added!');
    }).catch((err) => {
      this.toastr.error(err);
      this.sharedService.changeLoderStatus(false);
    })
  }

}
