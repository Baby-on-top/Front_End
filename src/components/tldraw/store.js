const Y = require("yjs");
const { WebsocketProvider } = require("y-websocket");

// Create the doc
const doc = new Y.Doc();

const currentURL = window.location.href;
const parts = currentURL.split("/");
let board_number = parts[parts.length - 1];
let roomID = `y-${board_number}`;

// Create a websocket provider
let provider = new WebsocketProvider(
  process.env.REACT_APP_YJS_CRDT_URL,
  roomID,
  doc,
  {
    connect: true,
  }
);

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
