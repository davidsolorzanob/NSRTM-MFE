import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nsrtm-page-main',
  templateUrl: './page-main.component.html',
  styleUrls: ['./page-main.component.scss']
})
export class PageMainComponent implements OnInit {
  mobileQuery?: MediaQueryList
  ngOnInit() { }
}
