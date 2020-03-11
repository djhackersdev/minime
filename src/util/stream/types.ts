export interface ReadableByteStream {
  close(): void;

  read(nbytes: number): Promise<Buffer>;
}

export interface WritableByteStream {
  close(): void;

  write(buf: Buffer): Promise<void>;
}

export type ByteStream = ReadableByteStream & WritableByteStream;
