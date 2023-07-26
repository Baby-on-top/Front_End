/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled'
import ModalHeader from "./ModalHeader";
import { useRecoilValue } from "recoil";
import { showModalState } from "../../routes/Board";

export default function WidgetAddModal() {
    const modal = useRecoilValue(showModalState);
    const WidgetBox = styled.div`
        width: 200px;
        height: 175px;
        line-height : 175px;  // 가운데 정렬
        text-align: center;
        background-color: #D9D9D9;
        font-size: 18px;
        border-radius: 6px;
        cursor: pointer;
    `;

    return (
        <div id="modal-wrap"
            css={{
                backgroundColor: 'rgba(0,0,0,0.4)', /* Black w/ opacity */
                overflow: 'auto',    /* Enable scroll if needed */
                position: 'fixed', 
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
                display: modal ? 'flex' : 'none',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '15px',
                zIndex: 2,
            }}
        >
            <div id="modal-body"
                css={{
                    width: '100%',
                    maxWidth: '800px',
                    padding: '15px 40px 35px',
                    margin: '0 auto',
                    border: '1px solid #777',
                    boxShadow: '0 8px 32px 0 rgba(0,0,0,0.25)',
                    backgroundColor: '#fff',
                    borderRadius: '16px',
                }}
            >
                <div id="modal-contents">
                    <ModalHeader />
                    <div css={{
                        paddingTop: 20, 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                        rowGap: 30,
                        columnGap: 50,
                        justifyContent: 'center',
                    }}>
                        <WidgetBox>캘린더 🗓️</WidgetBox>
                        <WidgetBox>노트 📒</WidgetBox>
                        <WidgetBox>그림판 🎨</WidgetBox>
                    </div>
                </div>
            </div>
        </div>
    )
}




