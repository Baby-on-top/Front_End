/** @jsxImportSource @emotion/react */
import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { widgetListState } from "../../utils/atoms";
import axios from "axios";
import { getThumbnail } from "../../components/board/hooks/updateThumbnail";
import { ArrowDownOnSquareIcon } from "@heroicons/react/24/solid";

const SaveImgaeBtn = ({ type, widgetId }) => {
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
        width: "50px",
        height: "50px",
        position: "absolute",
        top: type == "note" ? "150px" : type == "drawing" ? "70px" : "230px",
        right: type == "note" ? "460px" : type == "drawing" ? "20px" : "480px",
        borderRadius: "30px",
        boxShadow: "1px 2px 3px gray",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 30,
      }}
      whileTap={{ scale: 0.85 }}
      onClick={() => {
        getThumbnail(type, widgetId);
        fetch();
      }}
    >
      <ArrowDownOnSquareIcon
        width={30}
        height={30}
        css={{ color: "gray" }}
      ></ArrowDownOnSquareIcon>
    </motion.div>
  );
};

export default SaveImgaeBtn;
