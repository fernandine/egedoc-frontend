import { Component, Input } from '@angular/core';
import { Subscriber } from 'src/app/common/subscriber';
import { SubscriberService } from 'src/app/services/subscriber.service';
import { NgFor, DatePipe } from '@angular/common';

@Component({
    selector: 'app-subscriber-list',
    templateUrl: './subscriber-list.component.html',
    styleUrls: ['./subscriber-list.component.scss'],
    standalone: true,
    imports: [NgFor, DatePipe]
})
export class SubscriberListComponent {
  @Input() subscribers: Subscriber[] = [];

  constructor(private subscriberService: SubscriberService) {}

  ngOnInit() {
    this.subscriberService.get().subscribe(
      (data: Subscriber[]) => {
        this.subscribers = data;
        console.log(this.subscribers);
      },
      error => {
        console.error('Ocorreu um erro ao obter os subscribers:', error);
      }
    );

}
}
