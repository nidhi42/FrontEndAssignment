import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  postId: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get("id");
  }

}
