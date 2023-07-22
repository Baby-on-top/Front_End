import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { ySyncPlugin, yCursorPlugin, yUndoPlugin, undo, redo } from 'y-prosemirror'
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { schema } from './schema.js'
import { exampleSetup } from 'prosemirror-example-setup'
import { keymap } from 'prosemirror-keymap'

export default function Note() {
    window.addEventListener('load', () => {
        const ydoc = new Y.Doc()
        const provider = new WebsocketProvider('wss://demos.yjs.dev', 'prosemirror-demo', ydoc)
        const yXmlFragment = ydoc.getXmlFragment('prosemirror')
    
        const editor = document.createElement('div')
        editor.setAttribute('id', 'editor')
        const editorContainer = document.createElement('div')
        editorContainer.insertBefore(editor, null)
        const prosemirrorView = new EditorView(editor, {
            state: EditorState.create({
            schema,
            plugins: [
                ySyncPlugin(yXmlFragment),
                yCursorPlugin(provider.awareness),
                yUndoPlugin(),
                keymap({
                'Mod-z': undo,
                'Mod-y': redo,
                'Mod-Shift-z': redo
                })
            ].concat(exampleSetup({ schema }))
            })
        })
        document.body.insertBefore(editorContainer, null)
    
        const connectBtn = /** @type {HTMLElement} */ (document.getElementById('y-connect-btn'))
        connectBtn.addEventListener('click', () => {
            if (provider.shouldConnect) {
                provider.disconnect()
                connectBtn.textContent = 'Connect'
            } else {
                provider.connect()
                connectBtn.textContent = 'Disconnect'
            }
        })
    
        // @ts-ignore
        window.example = { provider, ydoc, yXmlFragment, prosemirrorView }
    })
    
    return (
        <>
            <div id="y-functions">
                <div id="y-version"></div>
                <button type="button" id="y-connect-btn">Disconnect</button>
            </div>
            <p></p>
            <p>This is a demo of the <a href="https://github.com/yjs/yjs">Yjs</a> ⇔ <a href="http://prosemirror.net/">ProseMirror</a> binding: <a href="https://github.com/yjs/y-prosemirror">y-prosemirror</a>.</p>
            <p>The content of this editor is shared with every client that visits this domain.</p>
        </>
    )
    
}
