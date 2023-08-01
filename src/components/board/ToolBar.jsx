
/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { colors } from '../../utils/colors';

export default function ToolBar() {
    const IconButton = styled.div`
        width: 44px;
        height: 44px;
        line-height: 44px;
        text-align: center;
        margin: 0px 3px;
        cursor: pointer;
        border-radius: 20%;
        color: ${colors.toolbar_button_grey};
        &:hover {
            background-color: #eee;
        }
    `;

    return (
        <div css={{
            position: 'fixed',
            bottom: '30px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'Row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            zIndex: 3,
            borderRadius: '8px',
            boxShadow: '0px 0px 8px 1px rgba(0,0,0,0.15)',
            height: 54,
            padding: '0px 4px',
        }}>
            <IconButton onClick={() => {console.log('asdasd')}} css={{color: colors.main_green}}>
                <i class="fas fa-mouse-pointer fa-lg"></i>
            </IconButton>
            <div css={{width: 1, height: 34, backgroundColor: '#eee', marginRight: '4px'}}></div>
            <IconButton onClick={() => {console.log('asdasd')}}>
                <i class="fa-solid fa-pen fa-lg"></i>
            </IconButton>
            <IconButton onClick={() => {console.log('asdasd')}}>
                <i class="fa-solid fa-t fa-lg"></i>
            </IconButton>
            <IconButton onClick={() => {console.log('asdasd')}}>
                <i class="fa-regular fa-note-sticky fa-lg"></i>
            </IconButton>
            <IconButton onClick={() => {console.log('asdasd')}}>
                <i class="fa-regular fa-calendar fa-lg"></i>
            </IconButton>
            <IconButton onClick={() => {console.log('asdasd')}}>
                <i class="fa-regular fa-image fa-lg"></i>
            </IconButton>
            <IconButton onClick={() => {console.log('asdasd')}}>
                <i class="fa-solid fa-file-export fa-lg"></i>
            </IconButton>
        </div>
    )
}
