import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'cleanValue',
})
export class CleanValuePipe implements PipeTransform {
  transform(value: string): string {
    //split by > and take the last element
    const split = value.split('>');
    return split[split.length - 1];
  }
}
