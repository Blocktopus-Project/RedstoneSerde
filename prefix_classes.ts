import { ArrayType, FixedLengthString, i32leb128, Options, UnsizedType } from "./deps.ts";

export class PrefixedString extends UnsizedType<string> {
  constructor(readonly prefixCodec: UnsizedType<number> = i32leb128) {
    super(1);
  }

  override readPacked(dt: DataView, options: Options = { byteOffset: 0 }): string {
    const len = this.prefixCodec.readPacked(dt, options);
    return new FixedLengthString(len).readPacked(dt, options);
  }

  override writePacked(value: string, dt: DataView, options: Options = { byteOffset: 0 }): void {
    this.prefixCodec.writePacked(value.length, dt, options);
    new FixedLengthString(value.length).writePacked(value, dt, options);
  }
}

export class PrefixedArray<T> extends UnsizedType<T[]> {
  constructor(
    readonly type: UnsizedType<T>,
    readonly prefixCodec: UnsizedType<number> = i32leb128,
  ) {
    super(type.byteAlignment);
  }

  override readPacked(dt: DataView, options: Options = { byteOffset: 0 }): T[] {
    const len = this.prefixCodec.readPacked(dt, options);
    return new ArrayType(this.type, len).readPacked(dt, options);
  }

  override writePacked(value: T[], dt: DataView, options: Options = { byteOffset: 0 }): void {
    this.prefixCodec.writePacked(value.length, dt, options);
    new ArrayType(this.type, value.length).writePacked(value, dt, options);
  }
}

export const varIntString = new PrefixedString();
