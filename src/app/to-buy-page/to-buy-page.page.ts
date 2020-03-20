import { Component, OnInit } from '@angular/core';
import {NavController, ToastController} from '@ionic/angular'

//import our firebase
import * as firebase from 'firebase';

@Component({
  selector: 'app-to-buy-page',
  templateUrl: './to-buy-page.page.html',
  styleUrls: ['./to-buy-page.page.scss'],
})
export class ToBuyPagePage implements OnInit {
  toBuy_title:string;
  toBuy_price:number; 
  toBuy_owner:string;

  constructor(
    private navCtrl:NavController,
    private toastCtrl:ToastController,

  ) {
    this.toBuy_owner= firebase.auth().currentUser.uid;

   }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user)=>{
      if(user ==null){
        this.navCtrl.navigateBack("/login")
      }
    })
  }

  add(){
    firebase.firestore().collection("toBuy").add({
      title:this.toBuy_title,
      price:this.toBuy_price, 
      owner:this.toBuy_owner,
      status:"incomplete",
      created:firebase.firestore.FieldValue.serverTimestamp()
    }).then((data)=>{
      this.toastCtrl.create({
        message:"Item have been Added",
        color: 'success',
        duration:3000
      }).then((toast)=>{
        toast.present();
      })
    }).catch((error)=>{
      this.toastCtrl.create({
        message:error.message,
        duration:3000
      }).then((toast)=>{
        toast.present();
      })
    })
  }

  back(){


    this.navCtrl.navigateForward("/home")
  }

}
