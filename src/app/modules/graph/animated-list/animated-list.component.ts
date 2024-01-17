import { Component, Input, OnInit } from '@angular/core';
import { BaseAppComponent } from '../../../core/components/base-app/base-app.component';

@Component({
  selector: 'app-animated-list',
  templateUrl: './animated-list.component.html',
  styleUrls: ['./animated-list.component.scss'],
})
export class AnimatedListComponent extends BaseAppComponent implements OnInit {
  @Input() articles!: any[];

  constructor() {
    super();
  }

  trackBy(index: any, x: any) {
    return x.name;
  }

  transform(index: number) {
    return `translateY(${(index + 1) * 100}%)`;
  }

  ngOnInit() {
    // this.init();
  }
}
