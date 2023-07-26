import 'remirror/styles/all.css';

import { WysiwygEditor } from '@remirror/react-editors/wysiwyg';
import React from 'react';
import css from 'refractor/lang/css.js';
import javascript from 'refractor/lang/javascript.js';
import json from 'refractor/lang/json.js';
import markdown from 'refractor/lang/markdown.js';
import typescript from 'refractor/lang/typescript.js';
import { htmlToProsemirrorNode } from 'remirror';
import { 
    HorizontalRuleExtension,
    CalloutExtension, 
    BlockquoteExtension, 
    CodeExtension, 
    UnderlineExtension, 
    BoldExtension, 
    PlaceholderExtension, 
    YjsExtension,
    CodeBlockExtension,
    wysiwygPreset,
} from 'remirror/extensions';
import { FindExtension } from '@remirror/extension-find';
import { WebrtcProvider } from 'y-webrtc';
import * as Y from 'yjs';
import {
    EditorComponent,
    FindReplaceComponent,
    Remirror,
    ThemeProvider,
    useCommands,
    useRemirror,
    ToggleCodeButton,
    Toolbar,
    ToggleBoldButton,
    ToggleUnderlineButton,
    ToggleBlockquoteButton,
    ToggleCalloutButton,
} from '@remirror/react';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  padding: 100px 300px;
`;

const ydoc = new Y.Doc();
// clients connected to the same room-name share document updates
const provider = new WebrtcProvider('remirror-yjs-demo', ydoc);

const extensions = () => [
    new BlockquoteExtension({ triggerKey: 'Tab' }), // Change the trigger key to 'Tab'
    new HorizontalRuleExtension(),
    ...wysiwygPreset(), 
    new FindExtension(),
    new CalloutExtension(),
    new BlockquoteExtension(),
    new CodeExtension(),
    new BoldExtension(),
    new UnderlineExtension(),
    new PlaceholderExtension({ placeholder: 'Type here...' }),
    new YjsExtension({ getProvider: () => provider }),
    new CodeBlockExtension({
        supportedLanguages: [css, javascript, json, markdown, typescript],
      }),
];

const Menu = () => {
    const { } = useCommands();

  return (
    <>
        {/* <button onClick={() => toggleBold()}>Bold</button>
        <button onClick={() => toggleUnderline()}>Underline</button> */}
    </>
  );
};
  

const Note3 = () => {
  const params = new URLSearchParams(window.location.search);
  const widgetName = params.get('name');

  const { manager, state, onChange } = useRemirror({ extensions, stringHandler: 'html', stringHandler: htmlToProsemirrorNode, core: { excludeExtensions: ['history'] } });

  return (
    <Wrapper>
      <ThemeProvider>
          {/* <WysiwygEditor placeholder='Enter text...' /> */}
          <h1>{widgetName}</h1>
          <Remirror manager={manager} initialContent={state} autoFocus autoRender='Enter your text'>
              <FindReplaceComponent />
              <EditorComponent />
              <Toolbar>
                  <ToggleCodeButton />
                  <ToggleBoldButton />
                  <ToggleUnderlineButton/>
                  <ToggleBlockquoteButton/>
                  <ToggleCalloutButton/>
              </Toolbar>
              <Menu />
          </Remirror>
      </ThemeProvider>
    </Wrapper>
  );
};

export default Note3;
