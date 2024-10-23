import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeWord',
  standalone: true
})
export class CapitalizeWordPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';
    return value.toUpperCase(); 
  }

}
