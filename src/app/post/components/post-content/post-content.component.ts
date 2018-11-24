import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-post-content',
  templateUrl: './post-content.component.html',
  styleUrls: ['./post-content.component.scss'],
})
export class PostContentComponent {
  parser = new DOMParser();
  paragraphs: HTMLParagraphElement[];
  imageContainers: HTMLElement[];

  @Input('content')
  set content(c: string) {
    const doc = this.parser.parseFromString(c, 'text/html');
    this.paragraphs = Array.from(doc.body.querySelectorAll('p:not([class])'));
    this.imageContainers = Array.from(doc.body.querySelectorAll('figure'));

    // console.log(doc);
  }
}
