import { Tldraw, useFileSystem } from '@tldraw/tldraw';
import { useMultiplayerState } from './hooks/useMultiplayerState';
import CustomCursor from './CustomCursor';

export default function Board() {
    const fileSystemEvents = useFileSystem();
    const { ...events } = useMultiplayerState(
        `tldraw-${(new Date()).toISOString().substring(0, 10).replace(/-/g, '')}`
    );
    const component = { Cursor: CustomCursor };

    return (
        <div className="tldraw"
            css={`
                position: fixed;
                top: 0px;
                left: 0px;
                right: 0px;
                bottom: 0px;
                width: 100%;
                height: 100%;
            `}    
        >
            <Tldraw
                components={component}
                autofocus
                disableAssets={true}
                showPages={false}
                {...fileSystemEvents}
                {...events}
            />
        </div>
    )
}
