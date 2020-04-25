import { Component, OnInit } from '@angular/core';
import { Item } from '../../common/nav-menu/nav-menu.component';
import {SecurityComponentsService} from '../../../core/services/security-components.service';

@Component({
  selector: 'app-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  name: string;
  infoUser;

  items: Item[] =  new Array();
  item1: Item = new Item;
  item2: Item = new Item;
  item3: Item = new Item;
  item4: Item = new Item;
  item5: Item = new Item;
  item6: Item = new Item;

  constructor(private security: SecurityComponentsService) { }

  ngOnInit() {
    this.security.validateLogin();
    this.infoUser = JSON.parse(sessionStorage.getItem('userInfo'));
    this.name = this.infoUser.name;

    this.item1.titulo='Publicaciones';
    this.item1.image='fas fa-bullhorn';
    this.item1.path='/admin-home/publish';

    this.item2.titulo='Administración de residentes y SMS';
    this.item2.image='far fa-envelope';
    this.item2.path='/admin-home/send-sms';

    this.item3.titulo='Recordar a morosos SMS';
    this.item3.image='far fa-envelope';
    this.item3.path='/admin-home/remember-debtors';

    this.item4.titulo='Novedades de residentes';
    this.item4.image='fas fa-bell';
    this.item4.path='/admin-home/resident-news';

    this.item5.titulo='Actualizar mis datos';
    this.item5.image='fas fa-edit';
    this.item5.path='/admin-home/update-info';

    this.item6.titulo='Cerrar sesión';
    this.item6.image='fas fa-sign-out-alt';
    this.item6.path='';

    this.items.push(this.item1, this.item2, this.item3, this.item4, this.item5, this.item6);
  }

}
