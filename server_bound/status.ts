import { i64, InnerType, SizedStruct } from "../deps.ts";

export const statusRequestCodec = new SizedStruct({});
export type StatusRequestPacket = InnerType<typeof statusRequestCodec>;

export const pingRequestCodec = new SizedStruct({
  timestamp: i64,
});
export type PingRequestPacket = InnerType<typeof statusRequestCodec>;
