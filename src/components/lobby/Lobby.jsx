import SideNav from './SideNav';
import Cards from './Cards';
import BoardModal from './BoardModal'
import chat from '../../images/chat.png';
import { Global, css } from '@emotion/react';
/** @jsxImportSource @emotion/react */

export default function Lobby() {
    return (
        <div>
            <Global
                styles={css
                    `.some-class: {
                width: 100%;
                height: 100vh;
                float: left;               
            }`} />

            <SideNav />

            <div className="main"
                css={{
                    marginLeft: '270px',
                    fontSize: '25px',
                    fontWeight: 'bold',
                }}>
                <div className="header"
                    css={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                    }}>
                    <p className="title"
                        css={{
                            display: 'inline-block',
                            fontSize: '40px',
                            marginTop: '30px',
                        }}>jungle_blue</p>
                    <BoardModal />
                </div>
                <Cards />
            </div>
            <div className="footer" css={{
                bottom: '0px',
                right: '0px',
                position: 'fixed',
            }}>
                <img className="chat" src={chat} alt="chat" css={{
                    width: '70px',
                    height: '70px',
                    float: 'left',
                    padding: '20px 30px',
                }}/>

            </div>

        </div>
    )
}
