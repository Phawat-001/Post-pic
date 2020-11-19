import { Component, OnInit } from '@angular/core';
import { Input } from "@angular/core";
import { Postpic } from "../postpic";
import { FirebaseService } from "../firebase.service";
import { AngularFireStorage } from "@angular/fire/storage";

@Component({
  selector: 'app-display-pic',
  templateUrl: './display-pic.component.html',
  styleUrls: ['./display-pic.component.css']
})
export class DisplayPicComponent implements OnInit {

  constructor(
    private firebaseService: FirebaseService,
    private storage: AngularFireStorage
  ) { }
  @Input() postpic: Postpic;
  img_url: string;
  ngOnInit() {
    this.postpic = {
      ...this.postpic,
      date: this.timeAgo(this.postpic.date.toDate())
    };
    this.storage
      .ref(this.postpic.img_url)
      .getDownloadURL()
      .subscribe(res => {
        // console.log(res)
        this.img_url = res;
      });
  }
  timeAgo(val: Date) {
    const now = new Date();
    const diff = Math.abs(now.getTime() - val.getTime());
    const diffDay = Math.ceil(diff / (1000 * 3600 * 24));
    const diffHour = Math.ceil(diff / (1000 * 3600));
    const diffMinute = Math.ceil(diff / (1000 * 60));
    const diffSecond = Math.ceil(diff / 1000);

    if (diffSecond < 60) {
      return "just now.";
    }
    if (diffMinute < 60) {
      return `${diffMinute}minute(s) ago.`;
    }
    if (diffHour < 24) {
      return `${diffHour}hour(s) ago.`;
    }
    return `${diffDay}day(s) ago.`;
  }
  del() {

    if (window.prompt("Enter picture password") == this.postpic.password) {
      this.firebaseService
        .deletePostpic(this.postpic.id)
        .then(() => {
          alert("deleteComplete");
        })
        .catch(err => {
          alert("deleteFailure");
        });
    }
    else{
      alert("Wrong password");
    }
  }
}

