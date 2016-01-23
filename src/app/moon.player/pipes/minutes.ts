import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({name: 'minutes'})
export class MinutesPipe implements PipeTransform {
  static pad(num: number, size: number) {
    var s = num.toString();
    while (s.length < size) s = '0' + s;
    if (s === '-1') return '00';
    return s;
  }

  transform(value: string): string {
    let numericValue = parseFloat(value);
    if (isNaN(numericValue)) {
      return '00:00';
    }
    var minutes = numericValue / 60;
    var seconds = numericValue % 60;
    return MinutesPipe.pad(Math.floor(minutes), 2) + ':' + MinutesPipe.pad(Math.floor(seconds), 2);
  }
}
