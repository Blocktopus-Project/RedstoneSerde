import { i64, InnerType, SizedStruct } from "../deps.ts";

export const statusRequestCodec = new SizedStruct({});
export type StatusRequest = InnerType<typeof statusRequestCodec>;

export const pingRequestCodec = new SizedStruct({
  timestamp: i64,
});
export type PingRequest = InnerType<typeof statusRequestCodec>;
