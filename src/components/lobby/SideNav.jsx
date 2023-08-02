/** @jsxImportSource @emotion/react */
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import muji from "../../assets/muji.jpg";
import { kakaoUnlink, kakaoInfo } from "../../utils/apis";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import WorkSpaceModal from "./WorkSpaceModal";
import {
  recoilWorkspaceList,
  workspaceCheck,
  SelectedWsIdx,
  SelectedWsName,
} from "../../utils/atoms";
import { useRecoilState } from "recoil";
import { motion } from "framer-motion";
import InviteModal from "./InviteModal";
import useModal from "../hooks/useModal";

export default function SideNav() {
  const { modalOpen, close, open } = useModal();
  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const REDIRECT_LOGOUT_URI = process.env.REACT_APP_LOGOUT_REDIRECT_URI;
  const logoutLink = `https://kauth.kakao.com/oauth/logout?client_id=${REST_API_KEY}&logout_redirect_uri=${REDIRECT_LOGOUT_URI}`;
  const SERVER_URL = "/api/workspace";
  const [cookies] = useCookies(["cookies"]);
  const [profile, setProfile] = useState();
  const [name, setName] = useState();
  const [workspaceList, setWorkspaceList] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);

  const navigate = useNavigate();

  async function getUserInfo() {
    const response = await kakaoInfo(cookies);
    setName(response.data.data.name);
    setProfile(response.data.data.profile);
    console.log(profile);
  }

  const fetchData = async () => {
    // const response = await axios.get(SERVER_URL)
    console.log("aaaa");
    console.log(cookies.accessToken);
    const response = await axios.get(SERVER_URL, {
      headers: { Token: cookies.accessToken },
    });

    console.log("dddd");
    console.log(response);
    setWorkspaceList(response.data.data);
  };

  // hover 시작
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };
  // hover 끝

  // ref
  const refs = useRef([]);

  const [wsIdx, setWsIdx] = useRecoilState(SelectedWsIdx);
  const [wsName, setWsName] = useRecoilState(SelectedWsName);
  const selIdx = (idx) => {
    setWsName(refs.current[idx].innerText);
    setWsIdx(idx);
  };

  // useEffect(()=> {
  //     console.log('refs')
  //     console.log(refs)
  //     console.log(refs.current)
  //     console.log(wsIdx)
  // },[wsIdx])

  useEffect(() => {
    getUserInfo();
    fetchData();
  }, [cookies]);

  useEffect(() => {
    fetchData();
  }, [isUpdate]);

  return (
    <div
      className="side-nav"
      css={{
        width: "250px",
        height: "100%",
        background: "white",
        position: "fixed",
        float: "left",
        borderRight: "1px solid black",
      }}
    >
      <div
        className="side-nav-top"
        css={{
          height: "100px",
          borderBottom: "1px solid black",
        }}
      >
        <img
          className="muji"
          src={profile ?? muji}
          alt="얼굴"
          css={{
            width: "100px",
            height: "100px",
            float: "left",
          }}
        />
        <div
          css={{
            flex: 1,
            flexDirection: "row",
            height: "100px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="name"
            css={{
              fontSize: "30px",
              paddingLeft: "150px",
              paddingTop: "10px",
            }}
          >
            {name}
          </div>
          <div css={{ paddingLeft: "135px" }}>
            <button
              onClick={() => {
                window.location.href = logoutLink;
              }}
              css={{
                flex: 1,
                height: "30px",
                marginTop: "5px",
                marginRight: "5px",
                color: "white",
                fontSize: "15px",
                fontWeight: "bold",
                paddingLeft: "15px",
                paddingRight: "15px",
                backgroundColor: "green",
                border: "none",
                borderRadius: "10px",
              }}
            >
              +
            </button>

            <button
              onClick={async () => {
                const response = await kakaoUnlink(cookies);
                if (response.status === 200) {
                  navigate("/login");
                }
              }}
              css={{
                flex: 1,
                height: "30px",
                marginTop: "5px",
                marginRight: "5px",
                color: "white",
                fontSize: "15px",
                fontWeight: "bold",
                paddingLeft: "15px",
                paddingRight: "15px",
                backgroundColor: "red",
                border: "none",
                borderRadius: "10px",
              }}
            >
              x
            </button>
          </div>
        </div>
      </div>

      <div className="side-nav-mid">
        <p
          css={{
            marginLeft: "15px",
            fontSize: "25px",
            fontWeight: "bold",
          }}
        >
          workspace
        </p>
      </div>

      <motion.div
        className="side-nav-end"
        css={{
          padding: "0px 10px",
          fontSize: "20px",
        }}
      >
        {workspaceList.map((Workspace) => (
          <motion.div
            key={Workspace.workspaceId}
            ref={(el) => (refs.current[Workspace.workspaceId] = el)}
            onClick={() => selIdx(Workspace.workspaceId)}
            css={{
              display: "flex",
              alignItems: "center",
              borderRadius: "15px",
              margin: "10px 0px",
            }}
          >
            <motion.img
              className="side-nav-end-image"
              src={Workspace.workspaceImage}
              alt="얼굴"
              height={50}
              width={50}
              css={{
                float: "left",
                marginTop: "3px",
                marginLeft: "5px",
                /* margin-bottom: 5px; */
                marginRight: "10px",
                borderRadius: "30%",
              }}
            />
            <motion.div
              css={{
                backgroundColor: "#E3F4F4",
                borderRadius: "15px",
                margin: "5px 0px",
                width: "160px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <motion.p
                className={isHovering ? "hover" : ""}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                css={{
                  marginLeft: "10px",
                  flex: "3",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                {Workspace.workspaceName}
              </motion.p>
              {Workspace.workspaceId == wsIdx && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{
                    scale: 0.8,
                    rotate: -45,
                    borderRadius: "100%",
                  }}
                  css={{
                    backgroundColor: "#91C8E4",
                    borderRadius: "15px",
                    borderWidth: "0px",
                    marginRight: "5px",
                    width: "55px",
                    height: "55px",
                  }}
                  onClick={open}
                >
                  초대
                </motion.button>
              )}
            </motion.div>
          </motion.div>
        ))}
        {/* <p>baby_on_top</p>
                <p>jungle_blue</p>
                <p>pintos_study</p>
                <p>프론트엔드 스터디</p>
                <p>정글 2기</p> */}

        {modalOpen && (
          <InviteModal
            modalOpen={modalOpen}
            open={open}
            close={close}
            workspaceId={wsIdx}
          />
        )}

        <WorkSpaceModal isUpdate={isUpdate} setIsUpdate={setIsUpdate} />
      </motion.div>
    </div>
  );
}
