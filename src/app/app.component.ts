import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front-end-blog';
  public loading: boolean;
    hideHeader: boolean = false;
  constructor(private sharedService: SharedService, private router: Router,
    private route: ActivatedRoute) {
    this.loading = false;
    this.sharedService.currentMessage.subscribe(message => {
   
    });
    this.sharedService.loderCurrentStatus.subscribe(status => {
      setTimeout(() => {
        this.loading = status;
      }, 0);
    });
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/login?returnUrl=%2F' || event.url === '/registration' || event.url === '/login') {

          this.hideHeader = true;
        } else {
          this.hideHeader = false;
        }
      }
    });
  }
  ngOnInit(): void {
   
  }
}
