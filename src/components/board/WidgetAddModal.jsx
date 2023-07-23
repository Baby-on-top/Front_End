/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled'
import ModalHeader from "./ModalHeader";

export default function WidgetAddModal() {
    const WidgetBox = styled.div`
        padding: 64px 30px;
        text-align: center;
        background-color: #D9D9D9;
    `;

    return (
        <div id="modalWrap"
            css={{
                position: 'fixed', 
                zIndex: 1,           /* Sit on top */
                paddingTop: '13vh', /* Location of the box */
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
                overflow: 'auto',    /* Enable scroll if needed */
                backgroundColor: 'rgba(0,0,0,0.4)', /* Black w/ opacity */
            }}
        >
            <div id="modalBody"
                css={{
                    width: '60%',
                    height: '65vh',
                    padding: '20px 40px ',
                    margin: '0 auto',
                    border: '1px solid #777',
                    backgroundColor: '#fff',
                    borderRadius: '15px',
                }}
            >
                <div id="modalContents" css={{height: '100%'}}>
                    <ModalHeader />
                    <div css={{
                        paddingTop: 20, 
                        display: 'grid', 
                        gridTemplateColumns: '1fr 1fr 1fr',
                        rowGap: 30,
                        columnGap: 50,
                        height: '50vh',
                    }}>
                        <WidgetBox >캘린더</WidgetBox>
                        <WidgetBox>노트</WidgetBox>
                        <WidgetBox>그림판</WidgetBox>
                        <WidgetBox>포스트잇</WidgetBox>
                        <WidgetBox>스티커</WidgetBox>
                        <WidgetBox>뽀모도로</WidgetBox>
                    </div>
                </div>
            </div>
        </div>
    )
}




