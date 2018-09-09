import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Riddle } from "../models/riddles";
import list from '../assets/list/riddles';

@Injectable()
export class RiddlesService {
  private riddles: Riddle[] = [];
  private images;
  constructor(private storage: Storage) {}

  fetchRiddles() {
    return this.storage.get('images').then((images) => {
            this.riddles = list;
            let ima = images != null ? images : Array(this.riddles.length).fill('');
            this.images = ima;
            this.storage.set('images', ima).then();
            return this.images;
          })
      .catch(
        err => console.log(err)
      );
  }

  addImage(id: number, image: string) {
    this.images[id] = image;
    this.storage.set('images', this.images)
      .then()
      .catch(
        err => {
          console.log(err)
        }
      );
  }

  removeImage(id: number) {
    this.images[id] = '';
    this.storage.set('images', this.images)
      .then()
      .catch(
        err => {
          console.log(err)
        }
      );
  }

}
