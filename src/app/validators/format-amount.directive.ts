import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appFormatAmount]'
})
export class FormatAmountDirective {

   constructor(private elementRef: ElementRef) { }

  @HostListener('input', ['$event'])
  onInputChange(event: any) {
    const value = this.elementRef.nativeElement.value.replace(/,/g, '');
    const formattedValue = this.formatFinancialAmount(value);
    this.elementRef.nativeElement.value = formattedValue;
  }

  formatFinancialAmount(value: string) {
    if (value.length > 0) {
      return Number(value).toLocaleString();
    } else {
      return '';
    }
  }

}
