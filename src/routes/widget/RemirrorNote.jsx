import "remirror/styles/all.css";

import { useEffect, useState, useRef } from "react";
import { useCookies } from "react-cookie";
import React from "react";
import css from "refractor/lang/css.js";
import javascript from "refractor/lang/javascript.js";
import json from "refractor/lang/json.js";
import markdown from "refractor/lang/markdown.js";
import typescript from "refractor/lang/typescript.js";
import { htmlToProsemirrorNode } from "remirror";
import { kakaoInfo } from "../../utils/apis";
import {
  BulletListExtension,
  HardBreakExtension,
  HeadingExtension,
  LinkExtension,
  OrderedListExtension,
  TaskListExtension,
  ItalicExtension,
  FontFamilyExtension,
  FontSizeExtension,
  HorizontalRuleExtension,
  CalloutExtension,
  CodeExtension,
  UnderlineExtension,
  BoldExtension,
  PlaceholderExtension,
  YjsExtension,
  CodeBlockExtension,
  wysiwygPreset,
} from "remirror/extensions";
import { FindExtension } from "@remirror/extension-find";
import { WebsocketProvider } from "y-websocket";
import * as Y from "yjs";
import {
  EditorComponent,
  ListButtonGroup,
  Remirror,
  ToggleItalicButton,
  CommandButtonGroup,
  CommandMenuItem,
  DecreaseFontSizeButton,
  DropdownButton,
  IncreaseFontSizeButton,
  FindReplaceComponent,
  ThemeProvider,
  useCommands,
  useActive,
  useRemirror,
  ToggleCodeButton,
  Toolbar,
  ToggleBoldButton,
  ToggleUnderlineButton,
  ToggleBlockquoteButton,
  ToggleCalloutButton,
} from "@remirror/react";

const link = document.location.href;
console.log(link);

const segments = link.split("/");
const valueAfterNote = segments[segments.length - 1];
const widgetName = segments[segments.length - 2];

console.log(widgetName);

console.log(valueAfterNote);

const boardId = 11;

const noteId = valueAfterNote;

const roomID = `y-note-${boardId}-${noteId}`;

console.log(roomID);

let provider; // 선언에 let을 사용하여 변수를 선언합니다.
let awareness; // 마찬가지로 선언에 let을 사용합니다.

if (widgetName === "note") {
  console.log("note에 들어왔습니다.");
  const ydoc = new Y.Doc();
  // clients connected to the same room-name share document updates
  provider = new WebsocketProvider(
    "ws://ec2-3-37-28-211.ap-northeast-2.compute.amazonaws.com:3000",
    roomID,
    ydoc,
    {
      connect: true,
    }
  );
  awareness = provider.awareness;
}

const extensions = () => [
  new HardBreakExtension(),
  new BulletListExtension(),
  new OrderedListExtension(),
  new TaskListExtension(),
  new HeadingExtension(),
  new LinkExtension(),
  new ItalicExtension(),
  new FontFamilyExtension(),
  new FontSizeExtension({ defaultSize: "16", unit: "px" }),
  // new BlockquoteExtension({ triggerKey: 'Tab' }), // Change the trigger key to 'Tab'
  new HorizontalRuleExtension(),
  ...wysiwygPreset(),
  new FindExtension(),
  new CalloutExtension(),
  new CodeExtension(),
  new BoldExtension(),
  new UnderlineExtension(),
  new PlaceholderExtension({ placeholder: "Type here..." }),
  new YjsExtension({ getProvider: () => provider }),
  new CodeBlockExtension({
    supportedLanguages: [css, javascript, json, markdown, typescript],
  }),
];

const FONT_SIZES = ["8", "10", "12", "14", "16", "18", "24", "30"];

const FontSizeButtons = () => {
  const { setFontSize } = useCommands();
  const { fontSize } = useActive();
  return (
    <DropdownButton aria-label="Set font size" icon="fontSize">
      {FONT_SIZES.map((size) => (
        <CommandMenuItem
          key={size}
          commandName="setFontSize"
          onSelect={() => setFontSize(size)}
          enabled={setFontSize.enabled(size)}
          active={fontSize({ size })}
          label={size}
          icon={null}
          displayDescription={false}
        />
      ))}
    </DropdownButton>
  );
};

const FONT_FAMILIES = [
  ["serif", "Serif"],
  ["sans-serif", "San serif"],
  ["cursive", "Cursive"],
  ["fantasy", "Fantasy"],
];

const FontFamilyButtons = () => {
  const { setFontFamily } = useCommands();
  const active = useActive();
  return (
    <CommandButtonGroup>
      <DropdownButton aria-label="Font family" icon="text">
        {FONT_FAMILIES.map(([fontFamily, label]) => (
          <CommandMenuItem
            key={fontFamily}
            commandName="setFontFamily"
            onSelect={() => setFontFamily(fontFamily)}
            enabled={setFontFamily.enabled(fontFamily)}
            active={active.fontFamily({ fontFamily })}
            label={<span style={{ fontFamily }}>{label}</span>}
          />
        ))}
      </DropdownButton>
    </CommandButtonGroup>
  );
};

// Add this CSS to your styles or stylesheet
const customStyles = `
  .Prosemirror ul,
  .Prosemirror ol {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
  }
`;

const Note = () => {
  const { manager, state, onChange } = useRemirror({
    extensions,
    stringHandler: "html",
    stringHandler: htmlToProsemirrorNode,
    core: { excludeExtensions: ["history"] },
  });
  const [cookies] = useCookies(["cookies"]);
  const [name, setName] = useState("");

  // You can think of your own awareness information as a key-value store.
  // We update our "user" field to propagate relevant user information.
  awareness.setLocalStateField("user", {
    // Define a print name that should be displayed
    name: name,
    // Define a color that should be associated to the user:
    color: "#ffb61e", // should be a hex color
  });

  async function getUserInfo() {
    const response = await kakaoInfo(cookies);
    setName(response.data.data.name);
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    awareness.on("change", () => {
      // Map each awareness state to a dom-string
      const strings = [];
      awareness.getStates().forEach((state) => {
        console.log(state);
        if (state.user) {
          strings.push(
            `<div style="color:${state.user.color};">• ${state.user.name}</div>`
          );
        }
        const usersElement = document.querySelector("#users");
        if (usersElement) {
          usersElement.innerHTML = strings.join("");
        }
      });
    });
  }, []);

  return (
    <ThemeProvider>
      <div id="users"></div>
      <style>{customStyles}</style>
      <Remirror
        manager={manager}
        initialContent={state}
        autoFocus
        onChange={onChange}
        autoRender="Enter your text"
      >
        <FindReplaceComponent />
        <EditorComponent />
        <Toolbar>
          <CommandButtonGroup>
            <DecreaseFontSizeButton />
            <FontSizeButtons />
            <IncreaseFontSizeButton />
          </CommandButtonGroup>
          <FontFamilyButtons />
          <ToggleCodeButton />
          <ToggleBoldButton />
          <ToggleUnderlineButton />
          <ToggleItalicButton />
          <ListButtonGroup />
          <ToggleBlockquoteButton />
          <ToggleCalloutButton />
        </Toolbar>
      </Remirror>
    </ThemeProvider>
  );
};

export default Note;
