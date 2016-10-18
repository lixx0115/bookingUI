import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'double'
})
export class DoublePipe implements PipeTransform {

  transform(value: number, args?: any): any {
    console.log(args)
    return value * 2;
  }

}
