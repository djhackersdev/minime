interface SaveExpeditionResponseBase {
  type: "save_expedition_res";
  // tera TODO
}

export interface SaveExpeditionResponse1 extends SaveExpeditionResponseBase {
  format: 1;
}

export interface SaveExpeditionResponse2 extends SaveExpeditionResponseBase {
  format: 2;
}

export type SaveExpeditionResponse =
  | SaveExpeditionResponse1
  | SaveExpeditionResponse2;
