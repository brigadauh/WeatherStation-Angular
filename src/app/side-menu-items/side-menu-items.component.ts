import { Component, OnInit, Input } from '@angular/core';
import { Menu } from '../shared/menu';
import { SideMenuService } from '../services/side-menu.service';

@Component({
  selector: 'app-side-menu-items',
  templateUrl: './side-menu-items.component.html',
  styleUrls: ['./side-menu-items.component.css']
})
export class SideMenuItemsComponent implements OnInit {

  @Input() sideMenu: Menu[];
  @Input() hidden: boolean = true;
  constructor(private sideMenuService: SideMenuService) { }

  ngOnInit() {
    if (!this.sideMenu) {
      this.sideMenuService.getMenu()
        .subscribe(menu => this.sideMenu = menu);
    }
  }
  menuItemClick(menu,event) {
    console.log('event', event);
    if (menu.submenu.length > 0) {
      this.hidden = !this.hidden;
    }
  }

}
