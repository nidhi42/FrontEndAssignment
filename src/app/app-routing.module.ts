import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth-guard';
import { LoginComponent } from './login/login.component';
import { PostComponent } from './post/post.component';

import { RegistrationComponent } from './registration/registration.component';
import { UsersAddComponent } from './users/users-add/users-add.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [

  {
    path: '', component: UsersComponent, canActivate: [AuthGuard]

  },

  { path: 'login', component: LoginComponent },
  {
    path: 'user',
    component: UsersComponent,

  },
  {
    path: 'user/add',
    component: UsersAddComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'user/edit/:id',
    component: UsersAddComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'registration',
    component: RegistrationComponent,

  },
  {
    path: 'post',
    loadChildren: () => import('./post/post.module').then(m => m.PostModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
