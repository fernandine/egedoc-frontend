import { Component, Input } from '@angular/core';
import { Tester } from 'src/app/common/tester';
import { TesterService } from 'src/app/services/tester.service';

@Component({
  selector: 'app-tester-list',
  templateUrl: './tester-list.component.html',
  styleUrls: ['./tester-list.component.scss']
})
export class TesterListComponent {

  @Input() testers: Tester[] = [];

  constructor(private testerService: TesterService) {}

  ngOnInit() {
    this.testerService.list().subscribe(
      (data: Tester[]) => {
        this.testers = data;
        console.log(this.testers);  // Aqui você tem acesso à lista de testers
      },
      error => {
        console.error('Ocorreu um erro ao obter os testers:', error);
      }
    );

}

}
