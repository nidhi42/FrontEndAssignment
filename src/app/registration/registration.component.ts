import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../../service/shared.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  registrationDetail: any = {};
  userId;
  /**
   * Creates an instance of documenter.
   */
  constructor(private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {

  }


  /**
   * Submit registration details
   */
  onSubmit() {
    this.sharedService.changeLoderStatus(true);
    this.sharedService.registerationUser(this.registrationDetail).subscribe(result => {
      this.sharedService.changeLoderStatus(false);
      this.registrationDetail = result;
      this.router.navigate(['/login']);
    });

  }
}
