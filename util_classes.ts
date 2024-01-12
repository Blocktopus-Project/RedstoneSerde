import { i32leb128, Options, Strings, UnsizedType } from "./deps.ts";

export class VarIntString extends UnsizedType<string> {
    constructor() {
        super(1);
    }

    readPacked(dt: DataView, options: Options = { byteOffset: 0}): string {
        const len = i32leb128.readPacked(dt, options);
        const strCodec = new Strings.FixedLength(len);

        return strCodec.readPacked(dt, options);
    }

    writePacked(value: string, dt: DataView, options: Options = { byteOffset: 0}): void {
        i32leb128.writePacked(value.length, dt, options);
        const strCodec = new Strings.FixedLength(value.length);
        strCodec.writePacked(value, dt, options);
    }
}