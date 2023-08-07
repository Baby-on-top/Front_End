/** @jsxImportSource @emotion/react */

import { useEffect, useState } from "react";
import Controls from "./Controls";
import Videos from "./Videos";
import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";
import { useParams } from "react-router-dom";

const config = {
  mode: "rtc",
  codec: "vp8",
};

const token = null;

const useClient = createClient(config);
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

// boardName recoil로 가져와서 관리한다.
export default function VideoPlace() {
  const APP_KEY = process.env.REACT_APP_AGORA_APP_KEY;

  const boardId = useParams().boardId;
  const [users, setUsers] = useState([]);
  const [start, setStart] = useState(false);
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  useEffect(() => {
    let init = async (name) => {
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        console.log("🐮", user);

        console.log("✅ subscribe success ✅");
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            // 사용자를 추가한다.
            return [...prevUsers, user];
          });
        }
        if (mediaType === "audio") {
          user.audioTrack?.play();
        }
      });

      client.on("user-unpublished", (user, type) => {
        console.log("❌ unpublished ❌", user, type);
        if (type === "audio") {
          user.audioTrack?.stop();
        }
        if (type === "video") {
          setUsers((prevUsers) => {
            return prevUsers.filter((User) => User.uid !== user.uid);
          });
        }
      });

      client.on("user-left", (user) => {
        console.log("leaving", user);
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });
      //   console.log(APP_KEY);
      await client.join(APP_KEY, name, token, null);
      if (tracks) {
        console.log("📀", tracks);
        await client.publish([tracks[0], tracks[1]]); // track0 : audio, track1 : video
      }
      setStart(true);
    };

    if (ready && tracks) {
      console.log("📌", boardId);
      init(boardId);
    }
  }, [boardId, client, ready, tracks]);

  return (
    <div css={{ position: "fixed", bottom: 20, left: "50%" }}>
      <Controls />
      {start && tracks && <Videos users={users} tracks={tracks} />}
    </div>
  );
}
