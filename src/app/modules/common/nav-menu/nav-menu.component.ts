import { Component, OnInit, Input } from '@angular/core';

export class Item {
  titulo: string;
  image: string;
  path: string;
}

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  @Input('items') items: Item[];
  itemsAux: Item[];
  navBar;
  name: string;
  constructor() { }

  ngOnInit() {
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    this.name = userInfo.name;
    this.itemsAux= this.items;
    this.navBar = document.getElementById('navBar');
    this.validateItems();
  }
  validateItems(){
    if (window.matchMedia("(min-width: 600px)").matches) {
      this.items = this.items.filter(i => i.path!=='');
    }else{
      this.items = this.itemsAux;
    }
  }
}
