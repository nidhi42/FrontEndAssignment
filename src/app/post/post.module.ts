import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostAddComponent } from './post-add/post-add.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostComponent } from './post.component';
import { PostRoutingModule } from './post-routing.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
@NgModule({
  declarations: [PostAddComponent, PostDetailComponent, PostComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PostRoutingModule,
    TabsModule.forRoot(),
    CarouselModule.forRoot(),
    ProgressbarModule.forRoot()
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PostModule { }
