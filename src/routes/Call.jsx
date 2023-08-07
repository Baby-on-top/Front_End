/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import {
  AgoraVideoPlayer,
  IAgoraRTCRemoteUser,
  createClient,
  createMicrophoneAndCameraTracks,
} from "agora-rtc-react";

const config = {
  mode: "rtc",
  codec: "vp8",
};

const appId = "167a00d3f3be4a85bbbdbfc04829679f";
const token = null;

const Call = () => {
  const [inCall, setInCall] = useState(false);
  const [channelName, setChannelName] = useState("");

  const handleChannelName = (newChannelName) => {
    setChannelName(newChannelName);
    // console.log("✅", channelName);
  };

  return (
    <div>
      {inCall ? (
        <VideoCall channelName={channelName} />
      ) : (
        <ChannelForm
          setInCall={setInCall}
          channelName={channelName}
          setChannelName={handleChannelName}
        />
      )}
    </div>
  );
};
//
const useClient = createClient(config);
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

const VideoCall = ({ channelName }) => {
  // 당장 타입을 지정하지 않아도, IAoraRTCRemoteUser 타입에 맞게 될 거싱다.
  const [users, setUsers] = useState([]);
  const [start, setStart] = useState(false);
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  //   console.log("✅ready: ", ready);
  //   console.log("✅tracks: ", tracks);

  //   useEffect(() => {
  //     console.log("✅ready: ", ready);
  //     console.log("✅tracks: ", tracks);
  //     console.log("😀", client);
  //   }, [ready, tracks]);

  useEffect(() => {
    console.log("💡💡💡💡💡");
    let init = async (name) => {
      //   console.log("🌟", name);
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
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

      await client.join(appId, name, token, null);
      if (tracks) {
        console.log("📀", tracks);
        await client.publish([tracks[0], tracks[1]]); // track0 : audio, track1 : video
      }
      setStart(true);
    };

    if (ready && tracks) {
      console.log("💤 init ready 💤");
      init(channelName);
    }
  }, [channelName, client, ready, tracks]);

  return (
    <div>
      {ready && tracks && <Controls />}
      {start && tracks && <Videos users={users} tracks={tracks} />}
    </div>
  );
};

const Controls = () => {
  return <div>control🎮</div>;
};

const Videos = (props) => {
  const { users, tracks } = props;
  //   console.log("🐳", tracks);
  console.log("👀", users);
  return (
    <div>
      <div>Videos📀</div>
      <div>
        {/* Video track을 같이 보내야 한다. */}
        <AgoraVideoPlayer
          style={{ height: "100px%", width: "100px" }}
          className="vid"
          videoTrack={tracks[1]}
        />
        {users.length > 0 &&
          users.map((user) => {
            if (user.videoTrack) {
              return (
                <AgoraVideoPlayer
                  style={{ height: "100px", width: "100px" }}
                  className="vid"
                  videoTrack={user.videoTrack}
                  key={user.uid}
                />
              );
            } else return null;
          })}
      </div>
    </div>
  );
};

const ChannelForm = (props) => {
  const { setInCall, setChannelName } = props;
  return (
    <div>
      <div>channel form</div>
      <form>
        <input
          type="text"
          placeholder="Enter channel name"
          //   value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            setInCall(true);
          }}
        >
          참가하기
        </button>
      </form>
    </div>
  );
};

export default Call;
