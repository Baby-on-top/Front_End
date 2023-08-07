import "remirror/styles/all.css";

import { useCookies } from "react-cookie";
import React, { useEffect, useState } from "react";
import css from "refractor/lang/css.js";
import javascript from "refractor/lang/javascript.js";
import json from "refractor/lang/json.js";
import markdown from "refractor/lang/markdown.js";
import typescript from "refractor/lang/typescript.js";
import { kakaoInfo } from "../../utils/apis";
import { htmlToProsemirrorNode } from "remirror";
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

const RemirrorNote = () => {
  let myModule = require("../../components/tldraw/store");
  let provider = myModule.yjsReturn();

  let awareness = provider.awareness;
  const [cookies] = useCookies(["cookies"]);
  const [name, setName] = useState("");

  console.log("22222222222");
  getUserInfo();
  async function getUserInfo() {
    const response = await kakaoInfo(cookies);
    setName(response.data.data.name);
  }
  awareness.setLocalStateField("user", {
    // Define a print name that should be displayed
    name: name,
    // Define a color that should be associated to the user:
    color: "#ffb61e", // should be a hex color
  });

  useEffect(() => {
    awareness.on("change", () => {
      // Map each awareness state to a dom-string
      const strings = [];
      awareness.getStates().forEach((state) => {
        console.log("11111111111111111", name);
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

  useEffect(() => {
    console.log("dfadfasdf");
  }, [provider]);

  const { manager, state, onChange } = useRemirror({
    extensions,
    stringHandler: "html",
    stringHandler: htmlToProsemirrorNode,
    core: { excludeExtensions: ["history"] },
  });

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

export default RemirrorNote;
