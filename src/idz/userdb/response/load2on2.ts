interface Load2on2ResponseBase {
  type: "load_2on2_res";
  // TODO?
}

export interface Load2on2Response1 extends Load2on2ResponseBase {
  format: 1;
}

export interface Load2on2Response2 extends Load2on2ResponseBase {
  format: 2;
}

export type Load2on2Response = Load2on2Response1 | Load2on2Response2;
