import { Component, OnInit } from '@angular/core';
import {NavController, ToastController} from '@ionic/angular'

import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public FirstName:string;
  public LastName:string;
  public Budget:number;
  public profileUser:any;
  public userProfile:any[]=[];
  constructor(
    private navCtrl:NavController,
    private toastCtrl:ToastController,
   
  ) {
    
    this.retrieveData();
    firebase.auth().onAuthStateChanged((user)=>{
      this.profileUser=user
    if(user){
      this.navCtrl.navigateForward("/profile")
    } else{
      //null user
      this.navCtrl.navigateBack("/login")
    }
  })

   }

  ngOnInit() {

   

  }

  retrieveData(){
    firebase.auth().onAuthStateChanged((user)=>{
      firebase.firestore().collection("userProfile")
      .where("pId","==",user.uid)
      .onSnapshot((data)=>{ 
         this.userProfile = data.docs;
      })
    })
  
  }

  home(){
    this.navCtrl.navigateBack('/home')
  }

  add(){
    firebase.firestore().collection("userProfile").add({
      FirstName:this.FirstName,
      LastName:this.LastName, 
      Budget:this.Budget,
      haveAccount:true,
      pId:this.profileUser.uid,
      created:firebase.firestore.FieldValue.serverTimestamp()
    }).then((data)=>{
      this.toastCtrl.create({
        message:"Profile Submit",
        color: 'success',
        duration:3000
      }).then((toast)=>{
        toast.present();
        this.navCtrl.navigateForward("/home")
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

  update(){
    firebase.firestore().collection("userProfile").doc(this.profileUser.id).update({
      FirstName:this.FirstName,
      LastName:this.LastName, 
      Budget:this.Budget,
      haveAccount:true,
      pId:this.profileUser.uid,
      created:firebase.firestore.FieldValue.serverTimestamp()
    }).then((data)=>{
      this.toastCtrl.create({
        message:"Profile Submit",
        color: 'success',
        duration:3000
      }).then((toast)=>{
        toast.present();
        this.navCtrl.navigateForward("/home")
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
}
