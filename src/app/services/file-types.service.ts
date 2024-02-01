import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileTypesService {

  static isVideoFile(fileUri: string): boolean {
    return fileUri.endsWith('.mp4') || fileUri.endsWith('.mov');
  }

  static isAudioFile(fileUri: string): boolean {
    return fileUri.endsWith('.mp3') || fileUri.endsWith('.wav');
  }

  static isImageFile(fileUri: string): boolean {
    return fileUri.endsWith('.jpg') || fileUri.endsWith('.png') || fileUri.endsWith('.jpeg');
  }

}
