interface SaveExpeditionRequestBase {
  type: "save_expedition_req";
  field_0004: number;
}

export interface SaveExpeditionRequest1 extends SaveExpeditionRequestBase {
  format: 1;
}

export interface SaveExpeditionRequest2 extends SaveExpeditionRequestBase {
  format: 2;
}

export type SaveExpeditionRequest =
  | SaveExpeditionRequest1
  | SaveExpeditionRequest2;
