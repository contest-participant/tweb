function readTagSize(data: Uint8Array) {
  let s = 0, i;
  for(i = 0; i < 4; i++) {
    const b = data[i] & 0xff;
    s <<= 7;
    s |= b & 0x7f;
    if((b & 0x80) === 0) {
      break;
    }
  }
  return {
    size: s,
    byteLength: i + 1
  };
}

const processors: Record<string, (data: Uint8Array) => void> = {
  moov(data) {
    processMp4(data);
  },
  trak(data) {
    processMp4(data);
  },
  mdia(data) {
    processMp4(data);
  },
  minf(data) {
    processMp4(data);
  },
  stbl(data) {
    processMp4(data);
  },
  stsd(data) {
    processMp4(data.subarray(8));
  },
  mp4a(data) {
    processMp4(data.subarray(28));
  },
  esds(data) {
    data = data.subarray(5);
    // ES_ID length
    const esSize = readTagSize(data);
    data = data.subarray(esSize.byteLength);
    data = data.subarray(2); // ES_ID
    const flags = data[0]; // flags
    data = data.subarray(1);
    if(((flags >> 7) & 0x1) === 0x1) { // streamDependenceFlag
      data = data.subarray(2);
    }
    if(((flags >> 6) & 0x1) === 0x1) { // URLflag
      data = data.subarray(data[0] + 1);
    }
    if(((flags >> 5) & 0x1) === 0x1) { // OCRStreamFlag
      data = data.subarray(2);
    }
    while(data.byteLength) {
      const descriptorTag = data[0];
      data = data.subarray(1);
      let tagInfo = readTagSize(data);
      data = data.subarray(tagInfo.byteLength);
      if(descriptorTag !== 4) {
        data = data.subarray(tagInfo.size);
        continue;
      }
      data = data.subarray(13);
      if(tagInfo.size > 13 && data[0] === 5) {
        data = data.subarray(1);
        tagInfo = readTagSize(data);
        data = data.subarray(tagInfo.byteLength);
        const extraData = data.subarray(0, tagInfo.size);
        if(extraData.byteLength >= 2) {
          extraData[0] = 0x13;
          extraData[1] = 0x90;
        }
      }
      break;
    }
  }
};

const validAtoms = 'moov mvhd trak tkhd mdia mdhd minf hdlr vmhd smhd stbl stsz stco stss stts stsc co64 stsd ctts avc1 avcC hev1 hvc1 hvcC mp4a esds mdat ftyp'.split(/\s/);

const mdatEnds = {} as Record<string, number>
export function processMp4(data: Uint8Array, id?: string, partOffset?: number) {
  if(id in mdatEnds) {
    if(partOffset + data.byteLength < mdatEnds[id]) {
      return;
    }
  }
  if(id in mdatEnds) {
    const skipCount = mdatEnds[id] - partOffset ;
    if(skipCount > 0 && data.byteLength - skipCount > 0) {
      data = data.subarray(skipCount)
    }
  }
  while(data.byteLength >= 8) {
    const size = new DataView(data.buffer, data.byteOffset, data.byteLength).getUint32(0)
    const type = String.fromCharCode(...data.subarray(4,  8));
    const end = size > 1 ? size : data.byteLength;
    const box = data.subarray(8, end);
    if(!validAtoms.includes(type)) {
      data = data.subarray(1)
      continue;
    }

    if(type == 'mdat') {
      const missingCount =size - data.byteLength;
      const mdatEnd = partOffset + data.byteOffset + data.byteLength + missingCount;
      mdatEnds[id] = mdatEnd
    }
    if(type in processors && box.byteLength == size - 8) {
      processors[type](box);
    }
    data = data.subarray(end)
  }
}
