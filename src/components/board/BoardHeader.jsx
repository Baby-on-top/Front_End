/** @jsxImportSource @emotion/react */
import dambe_pikka from '../../assets/dambe_pikka.jpg';
import ddung_heart from '../../assets/ddung_heart.jpg';
import cat from '../../assets/cat.jpg';
import history from '../../assets/history.png';

export default function BoardHeader() {
  return (
     <div css={{
        position: 'fixed',
        width: '100%',
        backgroundColor: 'white',
        paddingBottom: 24,
        zIndex: 3,
     }}>
        <div css={{
            marginTop: 32,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            left: '50%',
            transform: 'translateX(-50%)',
        }}>
            <div css={{fontSize: 24, fontWeight: 500, color: '#9A9999'}}>
                Jungle_Blue&nbsp;&nbsp;/
            </div>
            <div css={{fontSize: 24, fontWeight: 500}}>
                &nbsp;&nbsp;막내온탑
            </div>
        </div>
        <div css={{
            marginTop: 32,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            float: 'right', 
            right: 0,
        }}>
            <div id='user-profiles'>
                <img src={dambe_pikka} alt='dambe_pikka' css={{position: 'relative', zIndex: 4, right: 28, width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} />
                <img src={ddung_heart} alt='ddung_heart' css={{position: 'relative', zIndex: 3, right: 35 , width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} />
                <img src={cat} alt='cat' css={{position: 'absolute', right: 72, width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} />
            </div>
            <img src={history} alt='history' css={{width: 32, height: 32, marginLeft: 12, marginRight: 24 }} />
        </div>
    </div>
  )
}
