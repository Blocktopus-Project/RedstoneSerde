import { i32leb128, type InnerType, Struct, u16be, u8 } from "../deps.ts";
import { varIntString } from "../util_classes.ts";

export const handshakeCodec = new Struct({
  protocolVersion: i32leb128,
  serverAdress: varIntString,
  serverPort: u16be,
  nextState: u8,
});

export type HandshakePacket = InnerType<typeof handshakeCodec>;
