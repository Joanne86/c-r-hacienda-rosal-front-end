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

  constructor() { }

  ngOnInit() {
    this.itemsAux= this.items;
    this.navBar = document.getElementById('navBar');
    console.log('ITEMS:', this.items);
    this.validateItems();
  }
  validateItems(){
    if (window.matchMedia("(min-width: 600px)").matches) {
      this.items = this.items.filter(i => i.path!=='');
      console.log('items: ', this.items);
    }else{
      this.items = this.itemsAux;
    }
  }

}
