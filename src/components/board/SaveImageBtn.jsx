/** @jsxImportSource @emotion/react */
import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { widgetListState } from "../../utils/atoms";
import axios from "axios";
import { getThumbnail } from "./hooks/updateThumbnail";
import { ArrowDownOnSquareIcon } from "@heroicons/react/24/solid";

const SaveImageBtn = ({ type, widgetId, boardId }) => {
  const [, setWidgetList] = useRecoilState(widgetListState);

  async function fetch() {
    try {
      const response = await axios.get("/api/widget/" + boardId);
      console.log("🚨", response.data.data);
      const newRects = response.data.data.map((data) => {
        return {
          ...data,
          id: data.id.toString(),
        };
      });

      setWidgetList(newRects);
    } catch (e) {
      console.error("fail : " + e);
    }
  }

  return (
    <motion.div
      css={{
        width: "40px",
        height: "40px",
        borderRadius: "30px",
        boxShadow: "1px 2px 3px gray",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        backgroundColor: "white",
        marginBottom: 6,
        marginRight: 6,
      }}
      whileTap={{ scale: 0.85 }}
      onClick={(e) => {
        e.stopPropagation();
        getThumbnail(type, widgetId);
        fetch();
        alert("위젯의 썸네일이 저장되었습니다.");
      }}
    >
      <ArrowDownOnSquareIcon
        width={28}
        height={28}
        css={{ color: "grey" }}
      ></ArrowDownOnSquareIcon>
    </motion.div>
  );
};

export default SaveImageBtn;
