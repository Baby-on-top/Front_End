const Y = require("yjs");
const { WebsocketProvider } = require("y-websocket");

const VERSION = 2;

// Create the doc
const doc = new Y.Doc();

const roomID = `y-tldraw-${VERSION}`;

// Create a websocket provider
const provider = new WebsocketProvider("ws://localhost:1234", roomID, doc, {
  connect: true,
});

// Export the provider's awareness API
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
