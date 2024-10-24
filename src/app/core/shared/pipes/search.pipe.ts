import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(!value) return null;
    if(!args) return value;
    if(value.length < 3) return null;

    args = args.toLowerCase();

    return value.filter((item: any)=>{
      return JSON.stringify(item).toLocaleLowerCase().includes(args);
    })
  }

}
