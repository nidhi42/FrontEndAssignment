import { Injectable, Input } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../app/_models/users';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  usersApi: string = `${environment.apiUrl}/users`;
  getUserByIdApi: string = `${environment.apiUrl}/users`;
  registerApi: string = `${environment.apiUrl}/auth/local/register`;
  Api: string = `${environment.apiUrl}/auth/local/register`;
  deleteApi: string = `${environment.apiUrl}/users/`;
  postCountApi: string = `${environment.apiUrl}/posts/count`;
  postsApi: string = `${environment.apiUrl}/posts`;
  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  private loderSource = new BehaviorSubject(false);
  loderCurrentStatus = this.loderSource.asObservable();
  public isPostDetail: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  constructor(private http: HttpClient, private router: Router) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }
  public get userValue(): User {
    return this.userSubject.value;
  }
  changeMessage(message: string) {
    this.messageSource.next(message);
  }

 

  changeLoderStatus(status: boolean) {
    this.loderSource.next(status);
  }
  login(userId) {
    return this.http.post<User>(this.usersApi, { userId })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
      
        this.userSubject.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  getRegisteredUserById(reqObj) {
    debugger

    return this.http.post(`${environment.apiUrl}/auth​/local`, reqObj);
  }
  addUser(formData: any): Observable<any> {
    debugger
    return this.http.post<any>(this.registerApi, formData, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    }).pipe(


    );
  }
  uploadMedia(media) {
    //const headerNew=new HttpHeaders().set('content-type','multipart/form-data');
    return this.http.post(`${environment.apiUrl}/upload`, media);
    //this.http.post()
  }
  registerationUser(formData: any): Observable<any> {
    debugger
    return this.http.post<any>(this.registerApi, formData, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    }).pipe(
    );
  }
  getUsers(): Observable<any> {
    return this.http.get<any>(this.usersApi);
  }
  //getUpdateUser(): Observable<any> {
  //  return this.http.get<any>(this.userUpdateAPi);
  //}

  getUserById(userId): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/users/${userId}`);
  }
  getPostById(postId): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/posts/${postId}`);
  }
  updateUserById(userId, reqObj): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/users/${userId}`, reqObj);
  }
  updatePostById(postId, reqObj): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/posts/${postId}`, reqObj);
  }
  deleteUserById(userId): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/users/${userId}` ,{
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    }).pipe();
  }
  
  getPostsCount() {
    return this.http.get<any>(this.postCountApi);
  }
  getPosts() {
    return this.http.get<any>(this.postsApi);
  }
  addPosts(post) {
    debugger
    return this.http.post<any>(this.postsApi, post, {

    });
  }
  loginUser(username: string, password: string) {
    return this.http.post<any>(`/users/auth/local`, { username, password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      }));
  }
  
  addComment(comment) {
    return this.http.post<any>(`${environment.apiUrl}/comments`, comment)
  }
  getComments() {
    return this.http.get<any>(`${environment.apiUrl}/comments?_limit=-1`);
  }
  updateComments(commentObj) {
    return this.http.put<any>(`${environment.apiUrl}/comments?_limit=-1&id=${commentObj.id}`, commentObj)
  }
  deleteCommentsById(Id): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/comments/${Id}`,{
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    }).pipe();
  }
  deletePostById(Id): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/posts/${Id}`, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    }).pipe();
  }
}

