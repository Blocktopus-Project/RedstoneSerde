import { InnerType, SizedArrayType, Struct, u64 } from "../deps.ts";
import { varIntString } from "../prefix_classes.ts";

export const loginStartCodec = new Struct({
  name: varIntString,
  // TODO: use `u128` once byte_type has a new release
  uuid: new SizedArrayType(u64, 2),
});
export type LoginStartPacket = InnerType<typeof loginStartCodec>;

// TODO: Add a PrefixedByteArray type.
export const encryptionReponseCodec = new Struct({});
