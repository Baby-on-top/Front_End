/** @jsxImportSource @emotion/react */
import { useRecoilState } from "recoil";
import { showModalState } from "../../utils/atoms";

export default function ModalHeader() {
  const [showModal, setShowModal] = useRecoilState(showModalState);
  return (
    <div css={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <p css={{fontSize: 20, fontWeight: 500}}>Widget</p> 
        <span id="close-btn"
            css={{
                width: 50,
                height: 50,
                textAlign: 'right',
                float: 'right',
                color: '#777',
                fontSize: '26px',
                cursor: 'pointer',
            }}
            onClick={() => setShowModal(!showModal)}
        >
          &times;
        </span>
    </div>
  )
}
