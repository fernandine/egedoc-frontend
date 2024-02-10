import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import Viewer from 'viewerjs';

@Component({
  selector: 'app-previewer',
  standalone: true,
  imports: [CommonModule, FormsModule, DialogModule],
  templateUrl: './previewer.component.html',
  styleUrl: './previewer.component.scss',
})
export class PreviewerComponent {

  constructor(private message: MessageService) { }

  ngOnInit(): void {
    if (history.state.fileContent && history.state.fileName) {
      const fileContent: ArrayBuffer = history.state.fileContent;
      if (fileContent.byteLength > 10 * 1024 * 1024) { //Limite de 10 MB
      this.message.add({ severity: 'error', summary: 'Arquivo muito grande para visualização' });
        return;
      }
      const byteArray = new Uint8Array(fileContent);
      const imageUrl = `data:image/jpeg;base64,${btoa(String.fromCharCode.apply(null, Array.from(byteArray)))}`;
      console.log('URL da imagem:', imageUrl);

      this.displayImage(imageUrl);
    } else {
      console.error('Conteúdo do arquivo ou nome do arquivo indisponível.');
    }
  }

  displayImage(imageUrl: string): void {
    const imageElement = document.getElementById('image') as HTMLImageElement;
    if (imageElement) {
      imageElement.src = imageUrl;
      const viewer = new Viewer(imageElement, {
        inline: true,
        viewed() {
          viewer.zoomTo(1);
        }
      });

    } else {
      console.error('Elemento img não encontrado.');
    }
  }
}
