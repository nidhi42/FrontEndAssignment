import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UploadService {
  SERVER_URL: string = "https://strapi-test.promactinfo.com";
  constructor(private httpClient: HttpClient) {

  }
  upload(file: File) {
    const formData: FormData = new FormData();

    formData.append('files', file);

    //const request = new HttpRequest('POST', `${this.SERVER_URL}/upload/`, formData, {
    //  reportProgress: true,
    //  responseType: 'json',

    //});

    return this.httpClient.post(`${this.SERVER_URL}/upload/`, formData);
  }
  uploadMedia(media) {
    //const headerNew=new HttpHeaders().set('content-type','multipart/form-data');
    return this.httpClient.post(`${this.SERVER_URL}/upload`, media);
    //this.http.post()
  }
  getFiles(): Observable<any> {
    return this.httpClient.get(`${this.SERVER_URL}/upload/files`);
  }

}
