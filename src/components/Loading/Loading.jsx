import Packman from '../assets/loading_packman.gif';
/** @jsxImportSource @emotion/react */

export default function Loading() {
  return (
    <div
        css={{
            height: '100vh',
            margin: 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
        }}  
    >
      <h2>잠시만 기다려 주세요.</h2>
      <img src={Packman} alt="로딩중" width="7%" />
    </div> 
  )
}
