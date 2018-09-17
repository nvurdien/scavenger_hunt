import { ErrorHandler } from '@angular/core';
import { IonicErrorHandler } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import {StatusBar} from "@ionic-native/status-bar";
import {RiddlesService} from "../services/riddles";
import {SplashScreen} from "@ionic-native/splash-screen";

class CameraMock extends Camera {
  getPicture(options) {
    return new Promise((resolve, reject) => {
      resolve("BASE_64_ENCODED_DATA_GOES_HERE");
    })
  }
}

export class AppProviders {

  public static getProviders() {

    let providers;

    if(document.URL.includes('https://') || document.URL.includes('http://')){

      // Use browser providers
      providers = [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        {provide: Camera, useClass: CameraMock},
        // Camera,
        RiddlesService
      ];

    } else {

      // Use device providers
      providers = [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        // {provide: Camera, useClass: CameraMock},
        Camera,
        RiddlesService
      ];

    }

    return providers;

  }

}
