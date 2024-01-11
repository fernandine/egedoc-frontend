import { Component } from '@angular/core';
import { HeaderService } from './services/header.service';
import { HeaderPlatformComponent } from './shared/layout/header-platform/header-platform.component';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/layout/header-site/header.component';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [NgIf, HeaderComponent, RouterOutlet, FooterComponent, HeaderPlatformComponent]
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
