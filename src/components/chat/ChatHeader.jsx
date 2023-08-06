/** @jsxImportSource @emotion/react */
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useRecoilState } from "recoil";
import { isChatModalOpened } from "../../utils/atoms";
import { isChatRoomOpened } from "../../utils/atoms";
import { ChevronDoubleLeftIcon } from "@heroicons/react/24/solid";

export default function ChatHeader({ roomName }) {
  const [isChatModal, setIsChatModal] = useRecoilState(isChatModalOpened);
  const [isChatRoom, setIsChatRoom] = useRecoilState(isChatRoomOpened);

  const closeChatMordal = () => {
    setIsChatModal(!isChatModal);
  };

  const closeChatRoom = () => {
    setIsChatRoom(!isChatRoom);
  };

  return (
    <div
      css={{
        display: "flex",
        height: "48px",
        marginBottom: "12px",
        justifyContent: "space-between",
        alignItems: "center",
        flex: "1",
      }}
    >
      <div css={{ display: "flex", flex: "1", alignItems: "center" }}>
        {isChatRoom ? (
          <div css={{ display: "flex", alignItems: "center" }}>
            <div
              css={{
                flex: "1",
              }}
            >
              <ChevronDoubleLeftIcon
                onClick={closeChatRoom}
                css={{
                  color: "#AFAFAF",
                  width: "24px",
                  display: "flex",
                }}
              ></ChevronDoubleLeftIcon>
            </div>
            <div
              css={{
                paddingLeft: "4px",
                fontSize: "20px",
                fontWeight: "600",
                alignItems: "center",
              }}
            >
              {roomName}
            </div>
          </div>
        ) : (
          <div
            css={{
              display: "flex",
              justifyContent: "space-between",
              flex: "1",
            }}
          >
            <div
              css={{
                flex: "1",
                fontSize: "x-large",
                fontWeight: "bold",
              }}
            >
              Chats
            </div>
            <div
              css={{
                display: "flex",
                alignItems: "center",
                flex: "1",
              }}
            >
              <input
                type="text"
                css={{
                  border: 0,
                  backgroundColor: "rgb(233, 233, 233)",
                  borderRadius: "10px",
                  fontSize: "16px",
                  outline: "none",
                  height: "28px",
                  padding: "10px 20px",
                  marginRight: "4px",
                }}
              ></input>
              <MagnifyingGlassIcon
                type="submit"
                css={{
                  color: "#AFAFAF",
                  width: "24px",
                }}
                onClick={() => {
                  // postRoom()
                }}
              />
            </div>
          </div>
        )}
      </div>
      <XMarkIcon
        className="modal-close"
        onClick={closeChatMordal}
        css={{
          color: "#AFAFAF",
          width: "24px",
          float: "right",
        }}
      />
    </div>
  );
}
