import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";

// Create the doc
export const doc = new Y.Doc();
export const roomID = "lignin";

// Create a websocket provider
export const provider = new WebsocketProvider(
  "wss://localhost:3000",
  roomID,
  doc,
  {
    connect: false
  }
);

// Export the provider's awareness API
export const awareness = provider.awareness;

export const yShapes = doc.getMap("shapes");
export const yBindings = doc.getMap("bindings");

// Create an undo manager for the shapes and binding maps
export const undoManager = new Y.UndoManager([yShapes, yBindings]);
