import { Component, OnInit, Input } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-header-welcome',
  templateUrl: './header-welcome.component.html',
  styleUrls: ['./header-welcome.component.css']
})
export class HeaderWelcomeComponent implements OnInit {

  @Input('name') name;

  constructor(private route: Router) { }

  ngOnInit() {
  }
  loginOut(){
    this.route.navigate(['login']);
    sessionStorage.clear();
  }
}
