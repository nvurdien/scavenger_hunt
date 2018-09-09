import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, NavParams, ViewController} from 'ionic-angular';
import {Camera, CameraOptions} from "@ionic-native/camera";
import {RiddlesService} from "../../services/riddles";

@IonicPage()
@Component({
  selector: 'page-item',
  templateUrl: 'item.html',
})
export class ItemPage implements OnInit {
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
              public alertCtrl: AlertController) {
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
            this.riddlesService.removeImage(this.item.id-1)
          }
        }
      ]
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemPage');
  }

}
