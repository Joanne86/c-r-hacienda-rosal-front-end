import { Component, OnInit } from '@angular/core';
import { Item } from '../../common/nav-menu/nav-menu.component';

@Component({
  selector: 'app-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  items: Item[] =  new Array();
  item1: Item = new Item;
  item2: Item = new Item;
  item3: Item = new Item;
  item4: Item = new Item;
  
  constructor() { }

  ngOnInit() {
    this.item1.titulo='Publicaciones';
    this.item1.image='fas fa-bullhorn';
    this.item1.path='/admin-home/publish';

    this.item2.titulo='Envio de novedades SMS';
    this.item2.image='far fa-envelope';
    this.item2.path='/admin-home/send-news';

    this.item3.titulo='Recordar a morosos SMS';
    this.item3.image='far fa-envelope';
    this.item3.path='/admin-home/remember-debtors';

    this.item4.titulo='Novedades de residentes';
    this.item4.image='fas fa-bell';
    this.item4.path='/admin-home/resident-news';

    this.items.push(this.item1, this.item2, this.item3, this.item4);
  }

}
