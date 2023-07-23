/** @jsxImportSource @emotion/react */

export default function ModalHeader() {
  return (
    <div css={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <p css={{fontSize: 20, fontWeight: 500}}>Widget</p> 
        <span id="closeBtn"
            css={{
                width: 50,
                height: 50,
                textAlign: 'right',
                float: 'right',
                color: '#777',
                fontSize: '30px',
                cursor: 'pointer',
            }}
        >
          &times;
        </span>
    </div>
  )
}
