import { Component, computed, input, linkedSignal } from '@angular/core';

@Component({
  selector: 'lib-gallery',
  imports: [],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
})
export class Gallery {
  readonly image = input.required<string>();
  readonly images = input.required<string[]>();

  readonly mainImage = linkedSignal(() => this.image());
  readonly galleryImages = computed(() => {
    if(this.images()?.length) {
      return [this.image(), ...this.images()]
    }
    return [this.image()];
  })
  
  showOnMain(img: string) {
    this.mainImage.set(img);
  }

}
