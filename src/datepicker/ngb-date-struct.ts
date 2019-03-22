/**
 * Interface of the model of the NgbxDatepicker and NgbxInputDatepicker directives
 */
export interface NgbxDateStruct {
  /**
   * The year, for example 2016
   */
  year: number;

  /**
   * The month, for example 1=Jan ... 12=Dec
   */
  month: number;

  /**
   * The day of month, starting at 1
   */
  day: number;
}
