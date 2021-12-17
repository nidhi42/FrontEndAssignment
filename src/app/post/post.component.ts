import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { SharedService } from '../../service/shared.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  isPosts: boolean;
  postCount: number;
  selectedItem = 0;
  user;
  userId;
  postId: number;
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
  isEdit: boolean;
  userName: string;
  isChangeNavigation: boolean;
/**
 * Creates an instance of documenter.
 */
  constructor(private sharedService: SharedService, private router: Router, private activatedRoute: ActivatedRoute) {
    router.events.subscribe((val) => {
      this.isChangeNavigation = true;
    });
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
          this.showPosts(this.postData[0]);
          
        
          for (let i = 0; i < this.postData.length; i++) {
            this.postName = this.postData[i].name;
          }
          this._albums.push(this.images);

        });
      }

    },
      error => {
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
      });
  }
  /**
   * Show Post Uservise on click of user icon.
   */
  showUserPost() {
    this.uservise = true;
    this.postData = this.postData.filter(x => x.user.id === this.userId);
   
    this.showPosts(this.postData[0]);
    
    this.isDelete = true;
    this.isEdit = true;
  }

  /**
   * Show Post and get post detail data
   */
  showPosts(postData) {
    this.postId = postData.id;
    this.postDetails = postData;
    if (this.postData !== null) {
      this.sharedService.getComments().toPromise().then((result) => {
        this.addedComments = result;
        this.addedComments = this.addedComments.filter(x => x.user !== null || x.commentText !== null);
        this.addedComments = this.addedComments.filter(x => x.post !== null ? x.post.id === this.postDetails.id : x.post);

      }).catch((err) => {
      })
    }

  }

  /**
   * Navigate to add new post
   */
  addNewPost() {
    this.router.navigate(['post', 'add']);
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
    });
    this.showUserPost();

  }
}
