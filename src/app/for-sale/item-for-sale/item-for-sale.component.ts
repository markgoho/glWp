import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { map, filter, switchMap } from 'rxjs/operators';

@Component({
  templateUrl: './item-for-sale.component.html',
  styleUrls: ['./item-for-sale.component.scss'],
})
export class ItemForSaleComponent {
  itemForSale$ = this.route.paramMap.pipe(
    filter(params => params.has('itemId')),
    map(params => params.get('itemId')),
    switchMap(itemId =>
      this.http
        .get(`https://admin.gideonlabs.com/wp-json/wp/v2/pages/${itemId}`)
        .pipe(map((res: any) => res.content.rendered))
    )
  );

  constructor(private http: HttpClient, private route: ActivatedRoute) {}
}
