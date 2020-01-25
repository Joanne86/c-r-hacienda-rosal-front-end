import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header-welcome',
  templateUrl: './header-welcome.component.html',
  styleUrls: ['./header-welcome.component.css']
})
export class HeaderWelcomeComponent implements OnInit {

  @Input('name') name;
  nombre = 'leidy';

  constructor() { }

  ngOnInit() {
  }

}
