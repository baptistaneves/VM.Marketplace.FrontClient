import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-account-breadcrumbs',
  templateUrl: './account-breadcrumbs.component.html',
  styleUrls: ['./account-breadcrumbs.component.scss']
})

// AccountBreadcrumbs Component
export class AccountBreadcrumbsComponent implements OnInit {

  @Input() title: string | undefined;
  @Input()
  breadcrumbItems!: Array<{
    link?: string;
    active?: boolean;
    label?: string;
  }>;

  Item!: Array<{
    label?: string;
  }>;

  currentRate: any = 4;

  constructor() { }

  ngOnInit(): void {
  }

}
