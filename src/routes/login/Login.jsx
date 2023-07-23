/** @jsxImportSource @emotion/react */

export default function Login() {
    const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
    const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    const loginHandler = () => {
      window.location.href = link;
    };

    return (
      <div css={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}>
        <div css={{
          fontSize: '80px',
          fontWeight: 'bold',
        }}> 
          리그닌 
        </div>

        <div 
          onClick={loginHandler}
          css={{
            display: 'block',
            marginTop: '100px',
            width: '300px',
            height: '73px',
            cursor: 'pointer',
            ":hover": {color: 'grey', opacity: 0.7}
          }}
        >
          <img src={process.env.PUBLIC_URL + '/assets/kakao_login.png'} alt="login" />
        </div>
      </div>
    );
}
