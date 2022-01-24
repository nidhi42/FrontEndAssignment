import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';
import { SharedService } from '../../service/shared.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  isPosts: boolean;
  isPostShow: boolean = false;
  postCount: number;
  selectedItem = 0;
  user;
  userId;
  postId;
  postData: any;
  postDetails: any;
  selectedPost;
  userList: any = [];
  addedComments;
  dataFetched: boolean = false;
  uservise: boolean = false;
  isDelete: boolean = false;
  postImageUrl;
  postName;
  _albums = [];
  images = [];
  album;
  userVisePost;
  isEdit = false;
  userName: string;
  isPost= false;
  isChangeNavigation: boolean;
  selectedHero?: any;
  /**
   * Creates an instance of documenter.
   */
  constructor(private sharedService: SharedService, private router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService) {
    router.events.subscribe((val) => {
      this.isChangeNavigation = true;
    });
    this.postId = window.location.href.split("/")[5];
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.userId = this.user.user.id;
    this.userName = this.user.user.username;
    this.getAllUsers();
    this.getPostCount();
  }

  /**
  * Get All post 
  */
  getPostCount() {
    this._albums = [];
    this.sharedService.getPostsCount().subscribe(data => {
      this.postCount = data;
      if (this.postCount == 0) {
        this.isPosts = false;
      } else {
        this.isPosts = true;
        this.sharedService.getPosts().subscribe(item => {
          this.postData = item.filter(x => x.user !== null);
          if (this.postId === null || this.postId === undefined) {
            this.showPosts(this.postData[0]);
          } else {
            let postData = this.postData.find(a => a.id === Number(this.postId));
            this.showPosts(postData);
          }
          for (let i = 0; i < this.postData.length; i++) {
            this.postName = this.postData[i].name;
          }
          this._albums.push(this.images);

        });
      }
    },
      error => {
        this.toastr.error(error);
      });
  }



  /**
  * Get All users
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
   * Show Post Uservise on click of user icon.
   */
  showUserPost() {
    this.uservise = true;
    this.postData = this.postData.filter(x => x.user.id === Number(this.userId));
    if (this.postData !== undefined && this.postData !== null && this.postData.length > 0) {
      this.showPosts(this.postData[0]);
      this.isPostShow = false;
    } else {
      this.isPostShow = true;
    }
    if (this.postId === null || this.postId === undefined) {
      this.isDelete = false;
      this.isEdit = false;
    } else {
     
      this.isDelete = true;
      this.isEdit = true;
    }


  }

  /**
   * Show Post and get post detail data
   */
  showPosts(postData) {
    this.postId = postData.id;
    this.postDetails = postData;
    if (this.postData !== null) {
      this.isPostShow = false;
      this.sharedService.getComments().toPromise().then((result) => {
        this.addedComments = result;
        this.addedComments = this.addedComments.filter(x => x.user !== null || x.commentText !== null);
        this.addedComments = this.addedComments.filter(x => x.post !== null ? x.post.id === this.postDetails.id : x.post);

      }).catch((err) => {
        this.toastr.error(err);
      })
    } else {
      this.isPostShow = true;
    }

  }

  /**
   * Navigate to add new post
   */
  addNewPost() {
    this.router.navigate(['/post/add']);
  }

  /**
   * Edit User By Id
   */
  editPost(Id) {
    this.router.navigate(['/post/edit', Id]);
  }


  /**
   * Delete Post By Id
   */
  deletePostById(Id) {
    this.sharedService.changeLoderStatus(true);
    this.sharedService.deletePostById(Id).toPromise().then((result) => {
      this.sharedService.changeLoderStatus(false);
      this.toastr.success('Post Deleted!!');
    }, err => {
      this.toastr.error(err);
    });
    this.showUserPost();
  }
}
