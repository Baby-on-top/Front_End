/** @jsxImportSource @emotion/react */

function App() {
  return (
    <div className="App" css={{
      height: '80vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    }}>
      <div className="btn_text" css={{
        fontSize: '80px',
        fontWeight: 'bold',
      }}>리그닌</div>
      <div className="kakao_btn" css={{
        display: 'block',
        marginTop: '130px',
        // backgroundColor: "red",
        // background: `url("./images/kakao_login.png")`,
        //backgroundRepeat: 'no-repeat',
        left: '44%',
        width: '300px',
        height: '73px',
        objectFit: 'scale-down'
      }}>
        <img src={require('./images/kakao_login.png')}></img>
      </div>
    </div>
  );
}

export default App;