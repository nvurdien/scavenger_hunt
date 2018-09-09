import {Component, OnInit} from '@angular/core';
import {ModalController} from 'ionic-angular';
import { ItemPage } from "../item/item";
import list from '../../assets/list/riddles';
import {Riddle} from "../../models/riddles";
import {RiddlesService} from "../../services/riddles";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  items:Riddle[];
  itemPage = ItemPage;
  constructor(private riddlesService: RiddlesService,
              public modalCtrl: ModalController) {

  }

  ngOnInit() {
    this.items = list;
    this.riddlesService.fetchRiddles().then((images: any[]) => {
      this.items.map((item, i) => {
        this.items[i].image = images[i];
        this.items[i].finish = images[i] != ''
      })
    });
  }

  presentModal(id) {
    const modal = this.modalCtrl.create(ItemPage, {item: this.items[id-1]});
    modal.onDidDismiss(data => {
      if(data !== this.items[id-1].image) {
        this.items = list;
        this.riddlesService.fetchRiddles().then((images: any[]) => {
          this.items.map((item, i) => {
            this.items[i].image = images[i];
            this.items[i].finish = images[i] != ''
          })
        });
      }
    });
    modal.present();
  }

}
