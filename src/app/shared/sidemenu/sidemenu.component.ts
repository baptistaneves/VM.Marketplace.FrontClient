import { Component, OnInit } from '@angular/core';
import { favorites } from 'src/app/pages/account/favorites/data';
import { product } from 'src/app/pages/sellerdashboard/product/data';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})

// Sidemenu Component
export class SidemenuComponent implements OnInit {

  public isCollapsed = true;
  favoriteproduct: any;
  products: any;

  constructor() {
    this.favoriteproduct = favorites
    this.products = product
  }

  ngOnInit(): void {
    const pathName = window.location.pathname;
    const items = Array.from(document.querySelectorAll("a.menulist"));
    let matchingMenuItem = items.find((x: any) => {
      return x.pathname === pathName;
    });
    matchingMenuItem?.classList.add('active')
  }

}
