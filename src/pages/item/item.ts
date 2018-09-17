import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {AlertController, NavParams, ViewController, Loading, LoadingController} from 'ionic-angular';
import {Camera, CameraOptions} from "@ionic-native/camera";
import {RiddlesService} from "../../services/riddles";

import fixOrientation from 'fix-orientation';

@Component({
  selector: 'page-item',
  templateUrl: 'item.html',
})
export class ItemPage implements OnInit {

  @ViewChild('inputcamera') cameraInput: ElementRef;
  // @ViewChild('imgresult') imgResult: ElementRef;
  item;
  image:string;
  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };
  constructor(public viewCtrl: ViewController,
              public navParams: NavParams,
              private camera: Camera,
              private riddlesService: RiddlesService,
              public alertCtrl: AlertController,
              private loadingCtrl: LoadingController) {
    console.log(navParams.get('item'))
  }

  ngOnInit() {
    this.item = this.navParams.get('item');
    this.image = this.item.image;
  }

  dismiss() {
    this.viewCtrl.dismiss(this.image);
  }

  async takePicture(): Promise<any> {
    try {
      this.camera.getPicture(this.options).then((imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64:
        this.image = 'data:image/jpeg;base64,' + imageData;
        this.riddlesService.addImage(this.item.id-1, this.image)
      }, (err) => {
        // Handle error
      });
    }
    catch(e){
      console.log(e)
    }
  }



  loading = (() => {
    let loadMessage: Loading;

    return {
      turnOn: () => {
        loadMessage = this.loadingCtrl.create({
          content: 'Please Wait, doing something awesome'
        });
        loadMessage.present();
      },
      turnOff: () => loadMessage.dismiss()
    };

  })();

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Remove Image',
      message: 'Do you want to remove this image?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.image = '';
            this.riddlesService.removeImage(this.item.id-1);
            // this.dismiss();
          }
        }
      ]
    });
    alert.present();
  }

  ionViewDidLoad() {
    //MY BIT
      const element = this.cameraInput.nativeElement as HTMLInputElement;
      element.onchange = () => {

        this.loading.turnOn();

        const reader = new FileReader();

        reader.onload = (r: any) => {

          //THIS IS THE ORIGINAL BASE64 STRING AS SNAPPED FROM THE CAMERA
          //THIS IS PROBABLY THE ONE TO UPLOAD BACK TO YOUR DB AS IT'S UNALTERED
          //UP TO YOU, NOT REALLY BOTHERED
          let base64 = r.target.result as string;

          //FIXING ORIENTATION USING NPM PLUGIN fix-orientation
          fixOrientation(base64, { image: true }, (fixed: string, image: any) => {
            //fixed IS THE NEW VERSION FOR DISPLAY PURPOSES
            this.image = fixed;
            this.riddlesService.addImage(this.item.id-1, this.image);

          });

        };
        this.loading.turnOff();

        reader.readAsDataURL(element.files[0]);
      }
    }

}
