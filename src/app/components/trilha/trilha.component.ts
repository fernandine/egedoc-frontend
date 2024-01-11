import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { NgClass, NgIf } from '@angular/common';
import { SharedModule } from 'primeng/api';
import { TimelineModule } from 'primeng/timeline';

interface EventItem {
  status?: string;
  date?: string;
  icon?: string;
  color?: string;
  image?: string;
}

@Component({
    selector: 'app-trilha',
    templateUrl: './trilha.component.html',
    styleUrls: ['./trilha.component.scss'],
    standalone: true,
    imports: [TimelineModule, SharedModule, NgClass, CardModule, NgIf, ButtonModule]
})
export class TrilhaComponent {
  events: EventItem[];

  constructor() {
      this.events = [
          { status: 'Ordered', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'game-controller.jpg' },
          { status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
          { status: 'Shipped', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
          { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' }
      ];
  }
}
