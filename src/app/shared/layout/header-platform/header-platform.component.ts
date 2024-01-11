import { Component } from '@angular/core';
import { User } from 'src/app/common/user';
import { NgFor } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { StyleClassModule } from 'primeng/styleclass';
import { RippleModule } from 'primeng/ripple';

@Component({
    selector: 'app-header-platform',
    templateUrl: './header-platform.component.html',
    styleUrls: ['./header-platform.component.scss'],
    standalone: true,
    imports: [RippleModule, StyleClassModule, InputTextModule, NgFor]
})
export class HeaderPlatformComponent {
users!: User[];
}
