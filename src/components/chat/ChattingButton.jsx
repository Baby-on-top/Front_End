/** @jsxImportSource @emotion/react */
import chat from '../../assets/chat.png';

export default function ChattingButton() {
  return (
    <div css={{
        position: 'fixed',
        right: 30,
        bottom: 20,
    }}>
        <img className="chat" src={chat} alt="chat" css={{
            width: '60px',
            height: '60px',
            filter: 'drop-shadow(0px 0px 14px rgba(0,0,0,0.25))',
        }}/>
    </div>
  )
}
