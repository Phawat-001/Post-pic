import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Postpic } from "./postpic"

@Injectable()
export class FirebaseService {

  constructor(private firestore: AngularFirestore
  ) { }

  getPostpic(){
    let DocRef = 
    this.firestore.collection<Postpic>
    ("PostPic",e => e.orderBy("date","desc")
    );
    return DocRef.valueChanges();
  }
  addPostpic(n:string, message: string, p:string,pass:string){
    let postpic ={ 
      name: n,
      msg: message,
      img_url: p,
      password:pass,
      date: firebase.default.firestore.Timestamp.now()};
    const ref = this.firestore.collection("PostPic").add(postpic);
    ref.then( newRef => {
      const upDateID = {
        id: newRef.id
      };
      newRef.update(upDateID);
    });
    return ref;
  };
  deletePostpic(id: string){
    return this.firestore.collection("PostPic").doc(id).delete();
  }
  
}