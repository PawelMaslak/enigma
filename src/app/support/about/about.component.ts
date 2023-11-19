import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements AfterViewInit {
  @ViewChild('image') image: ElementRef;
  @ViewChild('imageElement') imageElement: ElementRef;

  @ViewChild('loading') loading: ElementRef;

  isLoading: boolean = true;
  isLoadingTwo: boolean = true;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
  ) {}

  //Apply method to multiple images
  ngAfterViewInit(): void {
    this.renderer.listen(this.imageElement.nativeElement, 'load', () => {
      setTimeout(() => {
        this.isLoading = false;
        this.renderer.setStyle(this.imageElement.nativeElement, 'opacity', '1');
      }, 200);

      this.renderer.setStyle(this.imageElement.nativeElement, 'display', 'block');
    });
  }

  public onLoadImage(image: HTMLImageElement, loading: HTMLElement): void {
    this.renderer.setStyle(loading, 'opacity', 0);
    this.renderer.setStyle(image, 'display', 'block');
    setTimeout(() => {
      this.renderer.setStyle(image, 'opacity', 1);
      this.renderer.setStyle(loading, 'display', 'none');
    }, 700);
  }
}
