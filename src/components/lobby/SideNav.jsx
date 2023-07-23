/** @jsxImportSource @emotion/react */
import muji from '../../images/muji.jpg';
import { kakaoUnlink } from '../../utils/apis';
import { useCookies } from 'react-cookie';
import {useNavigate} from 'react-router-dom';

export default function SideNav() {
    const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
    const REDIRECT_LOGOUT_URI = process.env.REACT_APP_LOGOUT_REDIRECT_URI;
    const logoutLink = `https://kauth.kakao.com/oauth/logout?client_id=${REST_API_KEY}&logout_redirect_uri=${REDIRECT_LOGOUT_URI}`
    const [cookies] = useCookies(['cookies']);
    const navigate = useNavigate();
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
            <div css={{
                flex:1,
                flexDirection:'row',
                height:'100px',
                justifyContent:'center',
                alignItems:'center',
            }}>
            
            <div className="name"
             css={{
                fontSize: '30px',
                paddingLeft:'150px',
                paddingTop:'10px',
            
            }}>보드</div>
            <div css={{paddingLeft:'135px'}}>
             <button 
                onClick={()=>{
                    window.location.href = logoutLink;
                }}
                css={{
                    flex:1,
                    height: '30px',
                    marginTop: '5px',
                    marginRight: '5px',
                    color: 'white',
                    fontSize: '15px',
                    fontWeight: 'bold',
                    paddingLeft: '15px',
                    paddingRight: '15px',
                    backgroundColor: 'green',
                    border: 'none',
                    borderRadius: '10px',
                }}>
                    +
                </button>

                <button 
                onClick={ async ()=> {
                    const response = await kakaoUnlink(cookies);
                    if(response.status === 200){
                        navigate('/login');
                    }
                }
                }
                css={{
                    flex:1,
                    height: '30px',
                    marginTop: '5px',
                    marginRight: '5px',
                    color: 'white',
                    fontSize: '15px',
                    fontWeight: 'bold',
                    paddingLeft: '15px',
                    paddingRight: '15px',
                    backgroundColor: 'red',
                    border: 'none',
                    borderRadius: '10px',
                }}>
                    x
                </button>
                </div>
            </div>
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
