import {divideToFragments, State} from '../video/mp4Fragment';
import type ServiceMessagePort from './serviceMessagePort';

type A = Parameters<ServiceMessagePort<false>['addMultipleEventsListeners']>[0];
const liveStreams = new Map<string, {controllers: {inited: boolean, controller: ReadableStreamDefaultController<Uint8Array>}[], state:State & {lastTs?: bigint}}>();
function addLiveStreamController(controller: ReadableStreamDefaultController<Uint8Array>, groupCallId: string) {
  const liveStream = liveStreams.get(groupCallId);
  if(liveStream) {
    liveStream.controllers.push({inited:false, controller});
  } else {
    liveStreams.set(groupCallId, {controllers: [{inited: false, controller}], state: {lastSeq: 0}});
  }
}
function removeLiveStreamController(controller: ReadableStreamDefaultController<Uint8Array>, groupCallId: string) {
  const liveStream = liveStreams.get(groupCallId);
  if(liveStream) {
    liveStream.controllers = liveStream.controllers.filter(v => controller != v.controller);
  }
}

const eventListeners: A = {
  appendLiveStreamChunk: async({chunk, ts, groupCallId}) => {
    const stream = liveStreams.get(groupCallId);
    if(!stream) {
      return;
    }
    if(stream.state.lastTs && BigInt(ts) <= stream.state.lastTs) {
      return;
    }
    stream.state.lastTs = BigInt(ts);
    for(const controller of stream.controllers) {
      const [fragment, newState_] = await divideToFragments(chunk, !controller.inited, stream.state);
      controller.inited = true;
      stream.state = newState_;
      controller.controller.enqueue(fragment);
    }
  }
};

export interface LiveStreamFetchParams {
  groupCallId: string;
}

export function onLiveStreamFetch(event: FetchEvent, groupCallId: string) {
  let controller: ReadableStreamDefaultController<Uint8Array> | null = null;
  const stream = new ReadableStream<Uint8Array>({
    start(controller_) {
      addLiveStreamController(controller = controller_, groupCallId);
    },
    cancel() {
      if(controller) {
        removeLiveStreamController(controller, groupCallId);
      }
    }
  });
  event.respondWith(new Response(stream, {headers: {'content-type': 'video/mp4'}}));
}

export function addLiveStreamEventListeners(serviceMessagePort: ServiceMessagePort) {
  serviceMessagePort.addMultipleEventsListeners(eventListeners);
}
