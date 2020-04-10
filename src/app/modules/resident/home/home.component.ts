import { Component, OnInit } from '@angular/core';
import { Item } from '../../common/nav-menu/nav-menu.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  name: string;
  infoUser;

  items: Item[] =  new Array();
  item1: Item = new Item;
  item2: Item = new Item;
  item3: Item = new Item;
  item4: Item = new Item;

  constructor() { }

  ngOnInit() {
    this.infoUser = JSON.parse(sessionStorage.getItem('userInfo'));
    this.name = this.infoUser.name;

    this.item1.titulo='Noticias';
    this.item1.image='fas fa-mail-bulk';
    this.item1.path='/resident-home/news';

    this.item2.titulo='Estado de mis pagos';
    this.item2.image='fas fa-money-check-alt';
    this.item2.path='/resident-home/payments-state';

    this.item3.titulo='Enviar solicitud';
    this.item3.image='fas fa-paper-plane';
    this.item3.path='/resident-home/send-requests';

    this.item4.titulo='Mis solicitudes';
    this.item4.image='fas fa-paper-plane';
    this.item4.path='/resident-home/responses';

    this.items.push(this.item1, this.item2, this.item3, this.item4);
  }

}
