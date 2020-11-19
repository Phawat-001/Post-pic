import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { FirebaseService } from "../firebase.service";
import { Router } from "@angular/router";
import { AngularFireStorage } from "@angular/fire/storage";

@Component({
  selector: 'app-add-pic',
  templateUrl: './add-pic.component.html',
  styleUrls: ['./add-pic.component.css']
})
export class AddPicComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl(""),
    msg: new FormControl(""),
    img_url: new FormControl(""),
    password: new FormControl("")
  });
  //img_url: Observable<string | null>
  filePath: string;
  img: any;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private storage: AngularFireStorage
  ) {
    this.filePath = "/photo";
  }
  ngOnInit() {
  }

  onPostpic(){
    const date = new Date();
    const fileName = `test@${date.toUTCString()}`;
    const filePath = `${this.filePath}/${fileName}`;
    const ref = this.storage.ref(filePath);
    ref
      .put(this.img)
      .then(async () => {
        await this.firebaseService.addPostpic(
          this.form.value.name,
          this.form.value.msg,
          filePath,
          this.form.value.password,
        );
        this.router.navigate(["/time-line"]);
      })
      .catch(err => {
        console.error(err);
      });
  }
  uploadFile(event: any) {
    console.log("upload file");

    const file = event.target.files[0];
    this.img = file;
  }
}