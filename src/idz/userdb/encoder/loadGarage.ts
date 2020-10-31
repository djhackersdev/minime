import { encodeCar } from "./_car";
import { LoadGarageResponse } from "../response/loadGarage";

export function loadGarage1(res: LoadGarageResponse): Buffer {
  const buf = Buffer.alloc(0x03d0);

  buf.writeUInt16LE(0x0091, 0x0000);
  buf.writeUInt16LE(res.cars.length, 0x0002);

  for (let i = 0; i < res.cars.length; i++) {
    encodeCar(res.cars[i]).copy(buf, 0x0004 + 0x0060 * i);
  }

  return buf;
}

export function loadGarage2(res: LoadGarageResponse): Buffer {
  const buf = Buffer.alloc(0x0420);

  buf.writeUInt16LE(0x0088, 0x0000);
  buf.writeUInt16LE(res.cars.length, 0x0004);

  for (let i = 0; i < res.cars.length; i++) {
    encodeCar(res.cars[i]).copy(buf, 0x0008 + 0x0068 * i);
  }

  return buf;
}
