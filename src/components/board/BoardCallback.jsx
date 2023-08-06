import { useNavigate, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { widgetListState } from "../../utils/atoms";
import { useEffect } from "react";
import Loading from "../../components/Loading/Loading";
import axios from "axios";
// state 취득

export default function BoardCallback({ route }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [, setWidgetList] = useRecoilState(widgetListState);
  async function inviteWorkspace() {
    try {
      const response = await axios.get("/api/widget/" + location.state.roomId);
      console.log("🚨", response.data.data);
      const newRects = response.data.data.map((data) => {
        return {
          ...data,
          id: data.id.toString(),
        };
      });

      setWidgetList(newRects);
      if (response.status == 200) {
        navigate("/board/" + location.state.roomId);
      }
    } catch (e) {
      console.error("fail : " + e);
    }
  }

  useEffect(() => {
    inviteWorkspace();
  }, []);
  return (
    <div>
      <Loading />
    </div>
  );
}
