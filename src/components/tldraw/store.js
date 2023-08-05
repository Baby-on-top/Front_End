const Y = require("yjs");
const { WebsocketProvider } = require("y-websocket");

let widget_id = 2;

let board_id = 2;

// Create the doc
const doc = new Y.Doc();

const roomID = `y-${widget_id}-${board_id}`;

// Create a websocket provider
let provider = new WebsocketProvider(
  "ws://ec2-3-37-28-211.ap-northeast-2.compute.amazonaws.com:3000",
  roomID,
  doc,
  {
    connect: false,
  }
);

console.log(provider);

// Export the provider's awareness API
let awareness = provider.awareness;

const yShapes = doc.getMap("shapes");
const yBindings = doc.getMap("bindings");
const yRects = doc.getMap("rect");

// Create an undo manager for the shapes and binding maps
const undoManager = new Y.UndoManager([yShapes, yBindings, yRects], {
  trackedOrigins: new Set(["move-rect"]),
});

// 변수 값을 변경하는 함수
function setIDs(newWidgetID, newBoardID) {
  widget_id = newWidgetID;
  board_id = newBoardID;
  provider.disconnect();
  provider = new WebsocketProvider(
    "ws://ec2-3-37-28-211.ap-northeast-2.compute.amazonaws.com:3000",
    `y-${widget_id}-${board_id}`,
    doc,
    {
      connect: true,
    }
  );
  provider.connect();
  console.log(provider);
}

function yjsReturn() {
  return provider;
}

// 변수 값을 변경하는 함수
function yjsDisconnect() {
  provider.disconnect();
  window.location.reload();
}

module.exports = {
  doc,
  provider,
  awareness,
  yRects,
  yShapes,
  yBindings,
  undoManager,
  setIDs,
  yjsDisconnect,
  yjsReturn,
};
