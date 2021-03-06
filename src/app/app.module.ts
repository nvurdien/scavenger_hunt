import { BrowserModule } from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import {HomePage} from '../pages/home/home';
import {ItemPage} from '../pages/item/item';

import {StatusBar} from "@ionic-native/status-bar";
import {RiddlesService} from "../services/riddles";
import {SplashScreen} from "@ionic-native/splash-screen";
import {Camera} from "@ionic-native/camera";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ItemPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ItemPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    // {provide: Camera, useClass: CameraMock},
    Camera,
    RiddlesService
  ]
})
export class AppModule {}
