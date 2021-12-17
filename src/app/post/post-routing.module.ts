import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from './post.component';
import { PostAddComponent } from './post-add/post-add.component';
import { PostDetailComponent } from './post-detail/post-detail.component';



const routes: Routes = [
  {
    path: '',
    component: PostComponent,
    children: [
      {
        path: 'post-detail/:id',
        component: PostDetailComponent
      }
    ]
  },
  {
    path: 'post/add',
    component: PostAddComponent
  },
  {
    path: 'post/edit/:id',
    component: PostAddComponent,

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
