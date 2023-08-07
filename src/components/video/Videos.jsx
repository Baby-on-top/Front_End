/** @jsxImportSource @emotion/react */

import { AgoraVideoPlayer } from "agora-rtc-react";

// boardName recoil로 가져와서 관리한다.
export default function Videos({ users, tracks }) {
  console.log("users ✅", users);
  //   const [inCall, setInCall] = useState(false);
  return (
    <div>
      <div>Videos</div>
      <div css={{ display: "flex" }}>
        <div>
          <AgoraVideoPlayer
            style={{
              height: "100px",
              width: "100px",
              backgroundColor: "blue",
              borderRadius: "8px",
              border: "2px solid red",
            }}
            className="vid"
            videoTrack={tracks[1]}
          />
        </div>
        {users.length > 0 &&
          users.map((user) => {
            if (user.videoTrack) {
              return (
                <div>
                  <AgoraVideoPlayer
                    style={{
                      height: "100px",
                      width: "100px",
                      backgroundColor: "black",
                      borderRadius: "50%",
                      border: "2px solid red",
                      overflow: "hidden",
                    }}
                    className="vid"
                    videoTrack={user.videoTrack}
                    key={user.uid}
                  />
                </div>
              );
            } else return null;
          })}
      </div>
    </div>

    // <div>
    //   <VideoCall />
    // </div>
    // <div css={{ position: "fixed", bottom: 20, left: "50%" }}><Controls/><Videos/></div>
  );
}
