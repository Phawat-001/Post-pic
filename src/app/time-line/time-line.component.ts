import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../firebase.service";
import { Postpic } from "../postpic";

@Component({
  selector: 'app-time-line',
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.css']
})
export class TimeLineComponent implements OnInit {

  postpics: Postpic[];

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.firebaseService.getPostpic().subscribe(val => {
      this.postpics = val;
    });
  }

}