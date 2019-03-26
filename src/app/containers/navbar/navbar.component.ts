import { Component } from '@angular/core';
import { SearchService } from '../../search.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(public searchService: SearchService) {}
}
