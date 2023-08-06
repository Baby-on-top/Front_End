/** @jsxImportSource @emotion/react */
import { useRef } from "react";
import { useInView } from "framer-motion";
import { colors } from "../../utils/colors";
import IntroduceWidgetTabView from "../../components/login/IntroduceWidgetTabView";

export default function Login() {
  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const loginHandler = () => {
    window.location.href = link;
  };

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div>
      <section
        ref={ref}
        css={{
          boxSizing: "border-box",
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          overflow: "hidden",
          padding: "50px",
          background: colors.main_green,
        }}
      >
        <span
          css={{
            transform: isInView ? "none" : "translateX(-200px)",
            opacity: isInView ? 1 : 0,
            transition: "all 1s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
            fontSize: 64,
            color: "white",
            fontWeight: 700,
            letterSpacing: "2px",
          }}
        >
          Lignin
        </span>

        <span
          css={{
            transform: isInView ? "none" : "translateX(-200px)",
            opacity: isInView ? 1 : 0,
            transition: "all 1s cubic-bezier(0.17, 0.55, 0.55, 1) 0.8s",
            fontSize: 24,
            color: "white",
            fontWeight: 500,
            marginTop: "12px",
            marginBottom: "24px",
          }}
        >
          팀별 협업 관리 화이트 보드
        </span>

        <div
          css={{
            transform: isInView ? "none" : "translateY(300px)",
            opacity: isInView ? 1 : 0,
            transition: "all 1s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
            margin: "auto",
          }}
        >
          <IntroduceWidgetTabView />
        </div>

        <div
          onClick={loginHandler}
          css={{
            transform: isInView ? "none" : "translateY(300px)",
            opacity: isInView ? 1 : 0,
            transition: "all 1s cubic-bezier(0.17, 0.55, 0.55, 1) 0.8s",
            width: "300px",
            height: "73px",
            cursor: "pointer",
            margin: "auto",
            marginBottom: 0,
          }}
        >
          <img
            src={process.env.PUBLIC_URL + "/assets/kakao_login.png"}
            alt="login"
          />
        </div>
      </section>
    </div>
  );
}
