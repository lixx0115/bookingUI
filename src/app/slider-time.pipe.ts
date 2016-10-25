import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sliderTime'
})
export class SliderTimePipe implements PipeTransform {

  transform(value: string, args?: any): string {
    console.log(new Date())
    console.log(value)
    if (!args) {
      return 'blocked'
    }
    let result = [];
    const list = value.split(/[\s,]+/);
    for (let item of list) {
      result.push(this.formate(+item))
    }
    return result.join(' to ');
  }

  formate(input: number) {

    if (input > 12) {
      return (input - 12).toString() + ' pm'
    }
    return input.toString() + ' am';
  }
}
