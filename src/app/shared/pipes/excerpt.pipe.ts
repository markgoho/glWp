import { Pipe, PipeTransform } from '@angular/core';

function parse(content: string): Document {
  const parser = new DOMParser();
  return parser.parseFromString(content, 'text/html');
}

@Pipe({
  name: 'excerpt',
})
export class ExcerptPipe implements PipeTransform {
  transform(value: any): any {
    const doc = parse(value);
    return doc.body.children[0].textContent;
  }
}
