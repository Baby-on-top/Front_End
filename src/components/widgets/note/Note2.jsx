import * as Y from 'yjs'
import { WebrtcProvider } from 'y-webrtc'
import { QuillBinding } from './y-quill'
import Quill from 'quill'
import QuillCursors from 'quill-cursors'
import './note.css';

export default function Note2() {
    Quill.register('modules/cursors', QuillCursors)

    window.addEventListener('load', () => {
    const ydoc = new Y.Doc()
    const provider = new WebrtcProvider('quill-demo-xxxx', ydoc)
    const type = ydoc.getText('quill')
    const editorContainer = document.createElement('div')
    editorContainer.setAttribute('id', 'editor')
    document.body.insertBefore(editorContainer, null)

    var editor = new Quill(editorContainer, {
        modules: {
        cursors: true,
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            ['image', 'code-block']
        ],
        history: {
            userOnly: true
        }
        },
        placeholder: 'Start collaborating...',
        theme: 'snow' // or 'bubble'
    })

    const binding = new QuillBinding(type, editor, provider.awareness)

    /*
    // Define user name and user name
    // Check the quill-cursors package on how to change the way cursors are rendered
    provider.awareness.setLocalStateField('user', {
        name: 'Typing Jimmy',
        color: 'blue'
    })
    */

    const connectBtn = document.getElementById('y-connect-btn')
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
    window.example = { provider, ydoc, type, binding, Y }
    })

    return (
        <>
            <button type="button" id="y-connect-btn">Disconnect</button>
            <p></p>
            <p>This is a demo of the <a href="https://github.com/yjs/yjs">Yjs</a> ⇔ <a href="https://quilljs.com/">Quill</a> binding: <a href="https://github.com/yjs/y-quill">y-quill</a>.</p>
            <p>The content of this editor is shared with every client that visits this domain.</p>
        </>
    )
}
