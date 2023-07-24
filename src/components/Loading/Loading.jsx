/** @jsxImportSource @emotion/react */
import { motion, useTime, useTransform } from "framer-motion";

export default function Loading() {
  const time = useTime();
  const rotate = useTransform(time, [0, 4000], [0, 360], { clamp: false });

  return (
    <div
        css={{
            width: '100vw',
            height: '100vh',
            margin: 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            // background: 'linear-gradient(180deg, #00AB59 0%, #008000 100%)',
            background: 'white',
            overflow: 'hidden',
        }}  
    >
      <div css={{marginBottom: 60}}>
        <motion.div 
          style={{ rotate }} 
          css={{
            background: '#00AB59',
            borderRadius: '30px',
            width: '150px',
            height: '150px',
          }} 
          />
      </div>
      <span css={{color: '#008000', fontSize: '18px'}}>
        잠시만 기다려 주세요.
      </span>
    </div> 
  )
}
