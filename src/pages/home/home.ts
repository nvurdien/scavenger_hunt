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
  point:any[];
  riddles: {};
  keys: any[];
  total: number;
  constructor(private riddlesService: RiddlesService,
              public modalCtrl: ModalController) {

  }

  ngOnInit() {
    this.items = list;
    this.point =[];
    this.riddles = {};
    this.total = 0;
    this.riddlesService.fetchRiddles().then((images: any[]) => {
      this.items.map((item, i) => {
        this.items[i].image = images[i];
        this.point.push(this.items[i].points);
        this.items[i].finish = images[i] != '';
        this.items[i].id = i + 1;
        this.total += this.items[i].finish ? this.items[i].points : 0;
      })
    }).then(() => {
      this.point = this.point.filter((v, i, a) => a.indexOf(v) === i);
    }).then(() => {
      this.point.map((points, j) => {
        this.riddles[points] = this.items.filter(item => item.points == this.point[j])
      });
    }).then(() => {
      this.keys = Object.keys(this.riddles).reverse();
    }).then(() => {
      console.log(this.keys);
      console.log(this.items);
      console.log(this.point);
      console.log(this.riddles)
    })

  }



  presentModal(id) {
    const modal = this.modalCtrl.create(ItemPage, {item: this.items[id-1]});
    modal.onDidDismiss(data => {
      if(data !== this.items[id-1].image) {
        this.items = list;
        let beforefinish = this.items[id-1].finish;
        console.log(beforefinish);

        this.riddlesService.fetchRiddles().then((images: any[]) => {
          this.items.map((item, i) => {
            this.items[i].image = images[i];
            this.items[i].finish = images[i] != ''
          });
        }).then(() => {
          console.log(this.items[id-1].finish);
          beforefinish != this.items[id-1].finish ? this.items[id-1].finish ? this.total += this.items[id-1].points : this.total -= this.items[id-1].points : '';
        });
      }
    });
    modal.present();
  }

}
