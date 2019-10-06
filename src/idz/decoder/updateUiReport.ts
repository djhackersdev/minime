import { UpdateUiReportRequest } from "../request/updateUiReport";

updateUiReport.msgCode = 0x0084;
updateUiReport.msgLen = 0x0410;

export function updateUiReport(buf: Buffer): UpdateUiReportRequest {
  return {
    type: "update_ui_report_req",
    field_02: buf.readUInt16LE(0x0002),
    field_04: buf.readUInt16LE(0x0004),
  };
}
