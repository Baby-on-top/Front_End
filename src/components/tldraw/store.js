const Y = require("yjs");
const { WebsocketProvider } = require("y-websocket");

let widget_id = 2;

let board_id = 3;

// Create the doc
const doc = new Y.Doc();

const roomID = `y-${widget_id}-${board_id}`;

// Create a websocket provider
let provider = new WebsocketProvider("wss://crdt.lignin.today", roomID, doc, {
  connect: true,
});

const awareness = provider.awareness;

const yShapes = doc.getMap("shapes");
const yBindings = doc.getMap("bindings");
const yRects = doc.getMap("rect");

// Create an undo manager for the shapes and binding maps
const undoManager = new Y.UndoManager([yShapes, yBindings, yRects], {
  trackedOrigins: new Set(["move-rect"]),
});

module.exports = {
  doc,
  provider,
  awareness,
  yRects,
  yShapes,
  yBindings,
  undoManager,
};
