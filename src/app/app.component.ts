import { Component } from '@angular/core';
import { HeaderService } from './services/header.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Egedoc - Gestão Documental Eletrônica';
  isHeaderForSite: boolean = true;

  constructor(public headerService: HeaderService) {}

  ngOnInit() {
    this.headerService.isHeaderSite$.subscribe(isHeaderSite => {
      this.isHeaderForSite = isHeaderSite;
    });
  }

  toggleHeader() {
    this.isHeaderForSite = !this.isHeaderForSite;
    this.headerService.setHeaderForSite(this.isHeaderForSite);
  }
}
