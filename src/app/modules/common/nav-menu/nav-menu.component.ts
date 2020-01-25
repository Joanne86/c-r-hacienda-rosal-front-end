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

  constructor() { }

  ngOnInit() {
    console.log('ITEMS:', this.items);
  }

}
