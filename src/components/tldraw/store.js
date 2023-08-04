const Y = require("yjs");
const { WebsocketProvider } = require("y-websocket");

var link = document.location.href;
console.log(link);

var segments = link.split("/");
var valueAfterNote = segments[segments.length - 1];
console.log(valueAfterNote);

const word = segments[segments.length - 2]; // Get the word between the second '/' and the first '/' from the right

console.log(word); // Output: "drawing"

const boardId = 11;

const tldrawId = valueAfterNote;

const roomID = `y-tldraw-${boardId}-${tldrawId}`;

console.log(roomID);

// Create the doc
const doc = new Y.Doc();

// Create a websocket provider
const provider = new WebsocketProvider("ws://localhost:1234", roomID, doc, {
  connect: true,
});

// Export the provider's awareness API
const awareness = provider.awareness;

const yShapes = doc.getMap("shapes");
const yBindings = doc.getMap("bindings");

// Create an undo manager for the shapes and binding maps
const undoManager = new Y.UndoManager([yShapes, yBindings]);

module.exports = {
  doc,
  provider,
  awareness,
  yShapes,
  yBindings,
  undoManager,
};
