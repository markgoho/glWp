import { Pipe, PipeTransform } from '@angular/core';

function parse(content: string): Document {
  const parser = new DOMParser();
  return parser.parseFromString(content, 'text/html');
}

function shorten(str: string, maxLen: number, separator = ' '): string {
  return str.length <= maxLen ? str : str.substr(0, str.lastIndexOf(separator, maxLen));
}

@Pipe({
  name: 'excerpt',
})
export class ExcerptPipe implements PipeTransform {
  transform(value: any): any {
    const doc = parse(value);
    const content = doc.body.children[0].textContent;
    return `${shorten(content, 150)}...`;
  }
}
