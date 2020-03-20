import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, } from '@angular/router';
import { NavController, AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

//firebase
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string;
  password: string;
  isAdmin: boolean = false;
  ref;
  userRef;
  constructor(
    private activeRouteCtrl: ActivatedRoute,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private router: Router,
    private authService: AuthService,
    private toastCtrl: ToastController,

  ) {
    let id = this.activeRouteCtrl.snapshot.paramMap.get("id");

  }

  ngOnInit() {


 

  }

  login() {
    if (typeof (this.email) === "undefined" && typeof (this.password) === "undefined") {
      this.toastCtrl.create({
        message: "Email and password cannot be empty",
        duration: 3000,
      }).then((t) => {
        t.present();
      })
    } else {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then((response) => {
        firebase.auth().onAuthStateChanged((user) => {
          this.ref = firebase.firestore().collection('userProfile');
          this.userRef = this.ref.where('pId', '==', user.uid).get()
            .then(snapshot => {
              if (snapshot.empty) {
                this.navCtrl.navigateBack("/profile")
                return;
              }
              snapshot.forEach(doc => {
                this.navCtrl.navigateForward("/home")
              });
            })
        })
      }).catch((error) => {
        if (error.code == 'auth/wrong-password') {
          this.toastCtrl.create({
            message: error.message,
            duration: 3000,
          }).then((t) => {
            t.present();
          })
        } else if (error.code == "auth/user-not-found") {
          this.toastCtrl.create({
            message: error.message,
            duration: 3000,
          }).then((t) => {
            t.present();
          })
        }
      })

    }

  }

  signUpPage() {
    this.navCtrl.navigateForward("/signup")
  }

  resetPassword() {
    let alert = this.alertCtrl.create({
      header: 'Login',
      inputs: [
        {
          name: 'EmailAddress',
          placeholder: 'Email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {

          }
        }, {
          text: 'Ok',
          handler: (data) => {
            //run reset
            this.authService.resetPassword(data.EmailAddress).then(
              async () => {
                const alert = await this.alertCtrl.create({
                  message: 'Check your email for a password reset link',
                  buttons: [
                    {
                      text: 'Ok',
                      role: 'cancel',
                      handler: () => {

                      },
                    },
                  ],
                });
                await alert.present();
              },
              async error => {
                const errorAlert = await this.alertCtrl.create({
                  message: error.message,
                  buttons: [{ text: 'Ok', role: 'cancel' }],
                });
                await errorAlert.present();
              }
            );
          }
        }
      ]
    }).then((alert) => {
      alert.present();
    })



  }
}
