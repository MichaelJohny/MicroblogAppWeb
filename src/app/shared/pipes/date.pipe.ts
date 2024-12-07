import { Pipe, PipeTransform } from '@angular/core';
import {formatDate} from "@angular/common";

@Pipe({
  name: 'date',
  standalone: true
})
export class DatePipe implements PipeTransform {

  transform(
    value: Date | undefined ,
    format: string = 'MM/dd/yyyy'
  ): string {
    if (!value) return '';

    try {
      return formatDate(value, format, 'en-US');
    } catch (error) {
      console.error('Invalid date format', error);
      return String(value);
    }
  }

}
