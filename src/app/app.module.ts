import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from "@angular/router";
//component
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { HomeComponent } from './home/home.component';
import { AddPicComponent } from './add-pic/add-pic.component';
import { TimeLineComponent } from './time-line/time-line.component';
import { DisplayPicComponent } from './display-pic/display-pic.component';
import { AngularFireStorageModule } from "@angular/fire/storage";
//firebase
import { AngularFireModule } from "@angular/fire";
import { environment } from "./environment";
//service
import { FirebaseService } from './firebase.service';

@NgModule({
  imports:      [ 
    BrowserModule, 
    FormsModule, 
    RouterModule.forRoot([
      { path: "time-line", component: TimeLineComponent },
      { path: "add-pic", component: AddPicComponent },
      { path: "*", component: TimeLineComponent }
    ]),
    ReactiveFormsModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
    ],

  declarations: [ 
    AppComponent, 
    HelloComponent, 
    HomeComponent,
    AddPicComponent, 
    TimeLineComponent, 
    DisplayPicComponent 
  ],

  bootstrap: [ AppComponent ],
  providers: [FirebaseService]
})
export class AppModule { }
