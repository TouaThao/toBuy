import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//import firebase 
import * as firebase from "firebase";

firebase.initializeApp({
    apiKey: "AIzaSyDOnl6K7IpJOrQbA4Iw65sGhtb0FLemAI0",
    authDomain: "ioniccodechallenge.firebaseapp.com",
    databaseURL: "https://ioniccodechallenge.firebaseio.com",
    projectId: "ioniccodechallenge",
    storageBucket: "ioniccodechallenge.appspot.com",
    messagingSenderId: "753885140551",
    appId: "1:753885140551:web:41d34b5f41a0d86af2c362",
    measurementId: "G-8LHGK7XRTW"
})



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {



}
