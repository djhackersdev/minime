import { UpdateUiReportRequest } from "../request/updateUiReport";

updateUiReport1.msgCode = 0x0084;
updateUiReport1.msgLen = 0x0410;

export function updateUiReport1(buf: Buffer): UpdateUiReportRequest {
  return {
    type: "update_ui_report_req",
    field_02: buf.readUInt16LE(0x0002),
    field_04: buf.readUInt16LE(0x0004),
  };
}

updateUiReport2.msgCode = 0x007e;
updateUiReport2.msgLen = 0x0410;

export function updateUiReport2(buf: Buffer): UpdateUiReportRequest {
  return {
    type: "update_ui_report_req",
    field_02: buf.readUInt16LE(0x0002),
    field_04: buf.readUInt16LE(0x0004),
  };
}
