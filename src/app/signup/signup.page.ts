import { Component, OnInit } from '@angular/core';
import{NavController,AlertController, ToastController} from '@ionic/angular'


//import our firebase
import * as firebase from 'firebase';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  email:string;
  password:string;

  constructor(
    private navCtrl:NavController,
    private alertCtrl:AlertController,
    private toastCtrl:ToastController,
  ) { }

  ngOnInit() {


  }

  ngChanges(){

  }
  
  signup(){
    //Todo
    // Refactor to switch case statement later
    if(this.email == null && this.password == null ){
      this.toastCtrl.create({
        header: "signup Error",
        message: 'Email and password Cannot be empty',
        buttons:[{
          text:"cancel"
        }]
      }).then((alert)=>{
        alert.present()
      })
     } else if(this.email == null){
     
      this.alertCtrl.create({
        header: "Email Error",
        message: 'Email Cannot be empty',
        buttons:[{
          text:"cancel"
        }]
      }).then((alert)=>{
        alert.present()
      })
     } else if(this.password == null){
      this.alertCtrl.create({
        header: "Password Error",
        message: 'Password Cannot be empty',
        buttons:[{
          text:"cancel"
        }]
      }).then((alert)=>{
        alert.present()
      })
    }

    //If everything is not null
    //We need to do an alert to let user know that password and email error

    else{
      firebase.auth().createUserWithEmailAndPassword(this.email,this.password).then((data)=>{
      }).catch((e)=>{
        console.log("error",e)
        //ToDo refactor to switch case later

        if(e.code == "auth/weak-password"){

            this.alertCtrl.create({
              header:"Password Length",
              message:"Password must be longer than 6 character",
              buttons:[{
                text:'cancel'
              }]
            }).then((alert)=>{
              alert.present();
            })
        }
         else if(e.code == "auth/invalid-email"){
          this.alertCtrl.create({
            header:"Invalid Email",
            message:"Email is Invalid",
            buttons:[{
              text:'cancel'
            }]
          }).then((alert)=>{
            alert.present();
          })
        }
        
      })
    }
    

  }

  back(){


    this.navCtrl.navigateForward("/login")
  }

}
