// See base.ts for information about branding.
export type CarSelector = number & { __brand: "car_selector" };

export interface Car {
  field_00: number;
  field_02: number;
  field_04: number[];
  selector: CarSelector;
  field_46: number;
  field_48: number;
  field_4A: number;
  field_4C: number;
  field_50_lo: number;
  field_50_hi: number;
  field_58: number;
  field_5A: number;
  field_5B: number;
  field_5C: number;
  field_5E: number;
}
