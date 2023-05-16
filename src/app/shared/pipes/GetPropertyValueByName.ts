import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getPropertyValueByName',
})
export class GetPropertyValueByName implements PipeTransform {
  transform(obj: any, property: string): string {
    return obj[property];
  }
}
