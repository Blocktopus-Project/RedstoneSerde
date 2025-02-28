import { i32leb128, Options, UnsizedType } from "./deps.ts";

const ENCODER = new TextEncoder();
const DECODER = new TextDecoder();

export class PrefixedString extends UnsizedType<string> {
  #prefix: UnsizedType<number>;
  constructor(prefix: UnsizedType<number>) {
    super(prefix.byteAlignment);
    this.#prefix = prefix;
  }

  readPacked(dt: DataView, options: Options = { byteOffset: 0 }): string {
    const len = this.#prefix.readPacked(dt, options);
    const result = DECODER.decode(
      new Uint8Array(dt.buffer, dt.byteOffset + options.byteOffset, len),
    );

    super.incrementOffset(options, len);

    return result;
  }

  writePacked(value: string, dt: DataView, options: Options = { byteOffset: 0 }): void {
    this.#prefix.writePacked(value.length, dt, options);
    ENCODER.encodeInto(
      value,
      new Uint8Array(dt.buffer, dt.byteOffset + options.byteOffset, value.length),
    );

    super.incrementOffset(options, value.length);
  }
}

export const varIntString = new PrefixedString(i32leb128);
