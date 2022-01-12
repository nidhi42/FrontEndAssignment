import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { SharedService } from '../../../service/shared.service';
import { UploadService } from '../../../service/upload.service';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.scss']
})
export class PostAddComponent implements OnInit {
  postAddForm: FormGroup;
  submitted = false;
  postDetail: any = {};
  userList: any = [];
  postId;
  user;
  userId;
  postTitle;
  postDescription = '';
  albumUploadedImages: Array<object> = [];
  postComments = '';
  selectedFiles: FileList;
  progressInfos = [];
  message = '';
  addedComments;
  fileInfos: Observable<any> | null = null;
/**
 * Creates an instance of documenter.
 */
  constructor(private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private fb: FormBuilder, private http: HttpClient, private uploadService: UploadService, private toastr: ToastrService) {
    
  }


  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.userId = this.user.user.id;
    this.postId = this.route.snapshot.paramMap.get("id");
    this.fileInfos = this.uploadService.getFiles();
    if (this.postId !== null) {
      
      this.getPostDetail(this.postId);
    }
    else {
      
      this.postDetail = {}
    }
  }

/**
 * Get post details
 */
  getPostDetail(postId) {
    
    this.sharedService.getPostById(postId).subscribe(result => {
      this.postDetail = result;
      this.postTitle = this.postDetail.name;
      this.progressInfos = this.postDetail.media;
      this.postDescription = this.postDetail.description;
    });
    
  }
/**
 * Add post detail method
 */
  addPost() {
    const reqObj = {
      title: this.postTitle,
      description: this.postDescription,
      media: this.progressInfos,
      user: this.userId,
      created_at: '2021-12-03T07:36:36.615Z',
      updated_at: '2021-12-03T07:36:36.615Z'
    }
    this.sharedService.changeLoderStatus(false);
    if (this.postId) {
      
      this.sharedService.updatePostById(this.postId, reqObj).subscribe(result => {
        this.sharedService.changeLoderStatus(true);
        this.toastr.success('Post Updated!');
      }, err => {
        this.toastr.error(err);
      });
      this.sharedService.changeLoderStatus(false);

    } else {
      
      this.sharedService.changeLoderStatus(false);
      this.sharedService.addPosts(reqObj).toPromise().then((result) => {
        this.sharedService.changeLoderStatus(true);
        this.postDetail = result;
        this.sharedService.changeLoderStatus(false);
      }).catch((err) => {
        console.log(err);
      })
    }

    this.sharedService.changeLoderStatus(false);
    this.router.navigate(['/post']);
   
  }

/**
 * Select Files event
 */
  selectFiles(e): void {
    this.progressInfos = [];
    this.selectedFiles = e.target.files;
    this.toastr.success('Image Selected Please Press Upload button!');
  }

/**
 * Upload file method
 */
  upload(idx, file): void {
    this.uploadService.upload(file).subscribe(
      (response: any) => {
        this.progressInfos[idx] = response[0];
        this.toastr.success('Image Uploaded!');
      }, 
      err => {
        this.toastr.error(err);
        this.progressInfos[idx].value = 0;
        this.message = 'Could not upload the file:' + file.name;
      });
  }

/**
 * upload file 
 */
  uploadFiles(): void {
    this.message = '';
    for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
    }
  }
}
