import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss']
})
export class OrderTableComponent implements OnInit {
  @Input('order') order
  @Input('displayed-columns') displayedColumns

  constructor(
  ) { }

  ngOnInit(): void {
  }

}
