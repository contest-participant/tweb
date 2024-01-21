import MP4Box from './mp4box.js';

export const moovReplacement = new Uint8Array([
  0, 0, 4, 176, 109, 111, 111, 118, 0, 0, 0, 108, 109, 118, 104, 100, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 232, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 243, 116,
  114, 97, 107, 0, 0, 0, 92, 116, 107, 104, 100, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 5, 0, 0, 0, 2, 208, 0, 0, 0, 0, 1,
  143, 109, 100, 105, 97, 0, 0, 0, 32, 109, 100, 104, 100, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 62, 128, 0, 0, 0, 0, 85, 196, 0, 0, 0, 0, 0, 45, 104,
  100, 108, 114, 0, 0, 0, 0, 0, 0, 0, 0, 118, 105, 100, 101, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 86, 105, 100, 101, 111, 72, 97, 110, 100, 108, 101, 114, 0,
  0, 0, 1, 58, 109, 105, 110, 102, 0, 0, 0, 20, 118, 109, 104, 100, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 36, 100, 105, 110, 102, 0, 0, 0, 28, 100,
  114, 101, 102, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 12, 117, 114, 108, 32, 0, 0,
  0, 1, 0, 0, 0, 250, 115, 116, 98, 108, 0, 0, 0, 174, 115, 116, 115, 100, 0, 0,
  0, 0, 0, 0, 0, 1, 0, 0, 0, 158, 97, 118, 99, 49, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 2, 208, 0, 72, 0, 0, 0, 72, 0,
  0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 255, 255, 0, 0, 0, 52, 97, 118,
  99, 67, 1, 100, 0, 31, 255, 225, 0, 24, 103, 100, 0, 31, 172, 217, 64, 80, 5,
  186, 16, 0, 0, 3, 0, 16, 0, 0, 125, 0, 241, 131, 25, 96, 1, 0, 5, 104, 235,
  236, 178, 44, 253, 248, 248, 0, 0, 0, 0, 20, 98, 116, 114, 116, 0, 0, 0, 0, 0,
  27, 158, 99, 0, 27, 158, 99, 0, 0, 0, 16, 115, 116, 116, 115, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 16, 115, 116, 115, 99, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20,
  115, 116, 115, 122, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 115, 116,
  99, 111, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 160, 116, 114, 97, 107, 0, 0, 0, 92,
  116, 107, 104, 100, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 60, 109, 100, 105, 97, 0, 0,
  0, 32, 109, 100, 104, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 187, 128,
  0, 0, 0, 0, 85, 196, 0, 0, 0, 0, 0, 45, 104, 100, 108, 114, 0, 0, 0, 0, 0, 0,
  0, 0, 115, 111, 117, 110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 83, 111, 117,
  110, 100, 72, 97, 110, 100, 108, 101, 114, 0, 0, 0, 0, 231, 109, 105, 110,
  102, 0, 0, 0, 16, 115, 109, 104, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 36,
  100, 105, 110, 102, 0, 0, 0, 28, 100, 114, 101, 102, 0, 0, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 12, 117, 114, 108, 32, 0, 0, 0, 1, 0, 0, 0, 171, 115, 116, 98, 108,
  0, 0, 0, 95, 115, 116, 115, 100, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 79, 79, 112,
  117, 115, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 16, 0, 0,
  0, 0, 187, 128, 0, 0, 0, 0, 0, 23, 100, 79, 112, 115, 0, 2, 0, 0, 0, 0, 187,
  128, 0, 0, 255, 2, 0, 0, 1, 0, 0, 0, 20, 98, 116, 114, 116, 0, 0, 0, 0, 0, 1,
  248, 176, 0, 1, 248, 176, 0, 0, 0, 16, 115, 116, 116, 115, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 16, 115, 116, 115, 99, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20,
  115, 116, 115, 122, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 115, 116,
  99, 111, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 72, 109, 118, 101, 120, 0, 0, 0, 32,
  116, 114, 101, 120, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 32, 116, 114, 101, 120, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0,
  0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 97, 117, 100, 116, 97, 0,
  0, 0, 89, 109, 101, 116, 97, 0, 0, 0, 0, 0, 0, 0, 33, 104, 100, 108, 114, 0,
  0, 0, 0, 0, 0, 0, 0, 109, 100, 105, 114, 97, 112, 112, 108, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 44, 105, 108, 115, 116, 0, 0, 0, 36, 169, 116, 111, 111, 0,
  0, 0, 28, 100, 97, 116, 97, 0, 0, 0, 1, 0, 0, 0, 0, 76, 97, 118, 102, 54, 48,
  46, 51, 46, 49, 48, 48
]);

export function concat(...buffers: [Uint8Array, Uint8Array, ...Uint8Array[]]) {
  let length = 0;
  for(const b of buffers) {
    length += b.length;
  }

  const buffer = new Uint8Array(length);
  let offset = 0;
  for(const b of buffers) {
    buffer.set(b, offset);
    offset += b.length;
  }

  return buffer;
}

export interface State {
  lastSample?: Record<number, {dts:number, duration:number}>;
  lastSeq: number;
}

export function divideToFragments(
  chunk: Uint8Array,
  first: boolean,
  state: State
) {
  let reject: (e: unknown) => void = () => {};
  const promise = new Promise<[Uint8Array, State]>((resolve, reject_) => {
    reject = reject_;
    const file = MP4Box.createFile(false);
    (file as any).initialSample = state.lastSample;
    let data = new Uint8Array();
    let lastTrack = 0;

    file.onReady = async({tracks}: any) => {
      for(const track of tracks) {
        file.setSegmentOptions(track.id, null);
        lastTrack = track.id;
      }
      let inited = false;
      for(const {buffer} of file.initializeSegmentation() as any[]) {
        if(first && !inited) {
          data = concat(data, new Uint8Array(buffer));
          inited = true;
        }
      }
      file.nextMoofNumber = state.lastSeq;
      file.start();
    };

    const lastSample = {} as State['lastSample'];
    file.onSegment = async(
      trackId: number,
      __: unknown,
      buffer: Uint8Array,
      ___: unknown,
      last: boolean
    ) => {
      data = concat(data, new Uint8Array(buffer));
      if(last) {
        const samples = file.getTrackById(trackId).samples;
        lastSample[trackId] = samples[samples.length - 1];
      }
      if(last && trackId == lastTrack) {
        if(first) {
          data = replaceMoov(data);
        }
        resolve([data, {lastSeq: file.nextMoofNumber, lastSample}]);
      }
    };

    const ab = chunk.buffer;
    (ab as any).fileStart = 0;
    file.appendBuffer(ab);
  });
  const timeout = setTimeout(() => {
    reject(new Error('divideToFragments took too long'));
  }, 30_000);
  promise.then(() => {
    clearTimeout(timeout);
  });
  return promise;
}

function replaceMoov(buffer: Uint8Array) {
  let offset = 0;
  const view = new DataView(
    buffer.buffer,
    buffer.byteOffset,
    buffer.byteLength
  );
  while(offset < buffer.byteLength) {
    const size = view.getUint32(offset);
    const type = new TextDecoder().decode(buffer.slice(offset + 4, offset + 8));
    if(type == 'moov') {
      const ftyp = buffer.subarray(0, offset);
      const rest = buffer.subarray(offset);
      return concat(ftyp, moovReplacement, rest);
    }

    offset += size;
  }
  return buffer;
}
