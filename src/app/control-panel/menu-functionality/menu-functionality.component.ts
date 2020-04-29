/*
* A side-menu that offers all the functionalities available for the administrator on the current organization
*/
import {Component, EventEmitter, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AdministratorDataService} from '../../services/AdministratorData.service';

@Component({
  selector: 'app-menu-functionality',
  templateUrl: './menu-functionality.component.html',
  styleUrls: ['./menu-functionality.component.css']
})
export class MenuFunctionalityComponent implements OnInit {

  constructor(private ads: AdministratorDataService, private router: Router ) { }

  ngOnInit(): void {
  }

  /*
  * Subscribes to the service 'DataService' to retrive the actual specific-component to be showed
  */
  updateContent(click: any) {
    this.router.navigateByUrl('/Content-panel/Panel/' + click.target.innerHTML);
  }
}
