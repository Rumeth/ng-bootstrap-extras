/**
 * Interface of the model of the NgbxTimepicker directive
 */
export interface NgbxTimeStruct {
  /**
   * The hour, going from 0 to 23
   */
  hour: number;

  /**
   * The minute, going from 0 to 59
   */
  minute: number;

  /**
   * The second, going from 0 to 59
   */
  second: number;
}
