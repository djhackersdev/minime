// See base.ts for information about branding.
export type CarSelector = number & { __brand: "car_selector" };

export interface Car {
  field_00: number;
  field_02: number;
  field_04: number[];
  selector: CarSelector;
  field_46: number;
  field_48: number;
  field_4a: number;
  field_4c: number;
  field_50_lo: number;
  field_50_hi: number;
  field_58: number;
  field_5a: number;
  field_5b: number;
  field_5c: number;
  field_5e: number;
}
