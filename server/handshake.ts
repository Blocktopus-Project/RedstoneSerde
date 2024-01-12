import { u8, Struct, VarInts, type InnerType, u16be } from "../deps.ts";

export const handshakeCodec = new Struct({
    protocolVersion: VarInts.i32leb128,
    // serverAdress: varintString,
    serverPort: u16be,
    nextState: u8, 
});

export type HandshakePacket = InnerType<typeof handshakeCodec>;
