import { Component } from '@angular/core';
import {LoadingController, ToastController,AlertController, NavController} from '@ionic/angular'


//import our firebase
import * as firebase from 'firebase';





@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public userId:string;
  public toBuys:any[]=[];
  public client;
  public userProfile:any[]=[];
  constructor( 
    private loadingCtrl:LoadingController,
    private toastCtrl:ToastController,
    private alertCtrl:AlertController,
    private navCtrl:NavController,
    

    ) {
      this.retrieveData();
      // this.retrieveUser();
    }

  //LifeCylce
  ngOnInit(){
    //check user
    firebase.auth().onAuthStateChanged((user)=>{
      if(user ==null){
        this.navCtrl.navigateBack("/login")
      }
    })
  }

  //Function

  retrieveData(){
    firebase.firestore().collection("toBuy")
    .where("status","==","incomplete")
    .onSnapshot((data)=>{
       this.toBuys = data.docs;
    })

  }

  // retrieveUser(){
  //   firebase.auth().onAuthStateChanged((user)=>{
  //     firebase.firestore().collection("userProfile")
  //     .where("pId","==",user.uid)
  //     .onSnapshot((data)=>{ 
  //       console.log("checking",data)
  //        this.userProfile = data.docs;
  //     })
  //   })
  // }


  goToStore(){
    this.navCtrl.navigateForward("/to-buy-page")
  }

  

  loginPage(){
    firebase.auth().signOut().then(()=>{
      this.navCtrl.navigateForward("/login")
    })
    
  
  }
  profile(){
    this.navCtrl.navigateForward("profile")
  }

  finish(document:firebase.firestore.QueryDocumentSnapshot){
    firebase.firestore().collection("toBuy").doc(document.id).set({
      "status":"completed"
    },
    {
      merge:true
    }).then(()=>{
      this.toastCtrl.create({
        message:"Completed",
        color: 'success',
        duration:2000
      }).then((toast)=>{
        toast.present();
      })
    })
  }

}


