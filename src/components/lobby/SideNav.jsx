import muji from '../../images/muji.jpg';
/** @jsxImportSource @emotion/react */

export default function SideNav() {
    return (
        <div className="side-nav"
         css={{
            width: '250px',
            height: '100%',
            background: 'white',
            position: 'fixed',
            float: 'left',
            borderRight: '1px solid black',
        }}>
            
            <div className="side-nav-top"
             css={{
                height: '100px',
                borderBottom: '1px solid black',
            }}>

            <img className="muji" src={muji} alt="얼굴"
             css={{
                width: '100px',
                height: '100px',
                float: 'left',
            }}/>
            <h1 className="name"
             css={{
                float: 'right',
                marginTop: '25px',
                marginRight: '50px',
            }}>보드</h1>
            </div>

            <div className="side-nav-mid">
            <p
             css={{
                marginLeft: '15px',
                fontSize: '25px',
                fontWeight: 'bold',
            }}>workspace</p>
            </div>

            <div className="side-nav-end"
             css={{
                marginLeft: '15px',
                fontSize: '20px',
            }}>
            <p>baby_on_top</p>
            <p>jungle_blue</p>
            <p>pintos_study</p>
            <p>프론트엔드 스터디</p>
            <p>정글 2기</p>
            </div>
        </div>
    );
}
