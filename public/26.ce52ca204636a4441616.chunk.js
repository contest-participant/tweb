(this.webpackJsonp=this.webpackJsonp||[]).push([[26],{14:function(e,t,s){"use strict";s.r(t),s.d(t,"STATE_INIT",(function(){return S})),s.d(t,"AppStateManager",(function(){return P}));var a=s(61),n=s(13),i=s(88),o=s(41),h=s(30),r=s(4),d=s(26),c=s(87),g=s(0),l=s(101),u=s(59),p=s(56),f=function(e,t,s,a){return new(s||(s=Promise))((function(n,i){function o(e){try{r(a.next(e))}catch(e){i(e)}}function h(e){try{r(a.throw(e))}catch(e){i(e)}}function r(e){var t;e.done?n(e.value):(t=e.value,t instanceof s?t:new s((function(e){e(t)}))).then(o,h)}r((a=a.apply(e,t||[])).next())}))};const m=r.a.version,S={allDialogsLoaded:{},pinnedOrders:{},contactsList:[],updates:{},filters:{},maxSeenMsgId:0,stateCreatedTime:Date.now(),recentEmoji:[],topPeers:[],recentSearch:[],version:m,authState:{_:g.isMobile?"authStateSignIn":"authStateSignQr"},hiddenPinnedMessages:{},settings:{messagesTextSize:16,sendShortcut:"enter",animationsEnabled:!0,autoDownload:{contacts:!0,private:!0,groups:!0,channels:!0},autoPlay:{gifs:!0,videos:!0},stickers:{suggest:!0,loop:!0},emoji:{suggest:!0,big:!0},themes:[{name:"day",background:{type:"image",blur:!1,slug:"ByxGo2lrMFAIAAAAmkJxZabh8eM",highlightningColor:"hsla(85.5319, 36.9171%, 40.402%, 0.4)"}},{name:"night",background:{type:"color",blur:!1,color:"#0f0f0f",highlightningColor:"hsla(0, 0%, 3.82353%, 0.4)"}}],theme:"system",notifications:{sound:!1}},keepSigned:!0,chatContextMenuHintWasShown:!1,stateId:Object(p.a)(4294967295)},b=Object.keys(S),v=["contactsList","stateCreatedTime","maxSeenMsgId","filters","topPeers"];class P extends a.a{constructor(){super(),this.log=Object(o.b)("STATE"),this.neededPeers=new Map,this.singlePeerMap=new Map,this.storages={users:new c.a(l.a,"users"),chats:new c.a(l.a,"chats"),dialogs:new c.a(l.a,"dialogs")},this.storagesResults={},this.storage=i.a,this.loadSavedState()}loadSavedState(){return this.loaded||(console.time("load state"),this.loaded=new Promise(e=>{const t=Object.keys(this.storages),s=t.map(e=>this.storages[e].getAll()),a=b.map(e=>i.a.get(e)).concat(u.a.get("user_auth"),u.a.get("state_id")).concat(i.a.get("user_auth")).concat(s);Promise.all(a).then(s=>f(this,void 0,void 0,(function*(){let a=this.state={};for(let e=0,t=b.length;e<t;++e){const t=b[e],n=s[e];void 0!==n?a[t]=n:this.pushToState(t,Object(h.a)(S[t]))}s.splice(0,b.length);let o=s.shift();const c=s.shift(),g=s.shift();if(!o&&g){o=g;const e=["dc","server_time_offset","xt_instance"];for(let t=1;t<=5;++t)e.push(`dc${t}_server_salt`),e.push(`dc${t}_auth_key`);const t=yield Promise.all(e.map(e=>i.a.get(e)));e.push("user_auth"),t.push("number"==typeof o?{dcID:t[0]||r.a.baseDcId,date:Date.now()/1e3|0,id:o}:o);let s={};e.forEach((e,a)=>{s[e]=t[a]}),yield u.a.set(s)}o&&(a.authState={_:"authStateSignedIn"},n.default.dispatchEvent("user_auth","number"==typeof o?{dcID:0,date:Date.now()/1e3|0,id:o}:o));for(let e=0,a=t.length;e<a;++e)this.storagesResults[t[e]]=s[e];if(s.splice(0,t.length),a.stateId!==c){if(void 0!==c){const e=new Map([["authState",void 0],["stateId",void 0]]);e.forEach((t,s)=>{e.set(s,Object(h.a)(a[s]))}),a=this.state=Object(h.a)(S),e.forEach((e,t)=>{a[t]=e});for(const e in this.storagesResults)this.storagesResults[e].length=0;this.storage.set(a)}yield u.a.set({state_id:a.stateId})}const l=Date.now();if(a.stateCreatedTime+864e5<l){d.b&&this.log("will refresh state",a.stateCreatedTime,l);(e=>{e.forEach(e=>{this.pushToState(e,Object(h.a)(S[e]));const t=this.storagesResults[e];t&&t.length&&(t.length=0)})})(v)}if(!a.settings.hasOwnProperty("theme")&&a.settings.hasOwnProperty("nightTheme")&&(a.settings.theme=a.settings.nightTheme?"night":"day",this.pushToState("settings",a.settings)),!a.settings.hasOwnProperty("themes")&&a.settings.background){a.settings.themes=Object(h.a)(S.settings.themes);const e=a.settings.themes.find(e=>e.name===a.settings.theme);e&&(e.background=a.settings.background,this.pushToState("settings",a.settings))}Object(h.k)(S,a,e=>{this.pushToState(e,a[e])}),a.version!==m&&this.pushToState("version",m),n.default.settings=a.settings,d.b&&this.log("state res",a,Object(h.a)(a)),console.timeEnd("load state"),e(a)}))).catch(e)})),this.loaded}getState(){return void 0===this.state?this.loadSavedState():Promise.resolve(this.state)}setByKey(e,t){Object(h.j)(this.state,e,t),n.default.dispatchEvent("settings_updated",{key:e,value:t});const s=e.split(".")[0];this.pushToState(s,this.state[s])}pushToState(e,t,s=!0){s&&(this.state[e]=t),this.storage.set({[e]:t})}requestPeer(e,t,s){let a=this.neededPeers.get(e);a&&a.has(t)||(a||(a=new Set,this.neededPeers.set(e,a)),a.add(t),this.dispatchEvent("peerNeeded",e),void 0!==s&&this.keepPeerSingle(e,t))}isPeerNeeded(e){return this.neededPeers.has(e)}keepPeerSingle(e,t){const s=this.singlePeerMap.get(t);if(s&&s!==e&&this.neededPeers.has(s)){const e=this.neededPeers.get(s);e.delete(t),e.size||(this.neededPeers.delete(s),this.dispatchEvent("peerUnneeded",s))}e&&this.singlePeerMap.set(t,e)}}P.STATE_INIT=S;const w=new P;d.a.appStateManager=w,t.default=w}}]);
//# sourceMappingURL=26.ce52ca204636a4441616.chunk.js.map