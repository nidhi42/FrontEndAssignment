import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { UsersAddComponent } from './users/users-add/users-add.component';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PostComponent } from './post/post.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { PostModule } from './post/post.module';
import { SharedModule } from '../service/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UsersAddComponent,
    RegistrationComponent,
    LoginComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    TabsModule.forRoot(),
    FormsModule,
    PostModule,
    SharedModule,

    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

  ],
  exports: [
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
