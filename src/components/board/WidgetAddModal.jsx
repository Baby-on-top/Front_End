/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useRecoilState } from "recoil";
import { showWidgetAddModalState } from "../../utils/atoms";
import { widgetListState } from "../../utils/atoms";
import { WidgetType } from "./WidgetType";
import { yRects } from "../tldraw/store";
import { useYcanvas } from "./useYCanvasWidget";
import { widgetAdd } from "../../utils/apis";
import axios from "axios";

export default function WidgetAddModal({ boardId }) {
  const [showWidgetAddModal, setShowWidgetAddModal] = useRecoilState(
    showWidgetAddModalState
  );
  const [widgetList, setWidgetList] = useRecoilState(widgetListState);

  const { testYRect } = useYcanvas(yRects);

  const WidgetSelectBox = styled.div`
    width: 200px;
    height: 175px;
    line-height: 175px; // 가운데 정렬
    text-align: center;
    background-color: #d9d9d9;
    font-size: 18px;
    border-radius: 6px;
    // cursor: pointer;
  `;

  const selectAddWidet = async (Type) => {
    let lastWidget = [];
    if (widgetList.length !== 0) {
      lastWidget = widgetList[widgetList.length - 1];
    }

    const getName = (Type) => {
      if (Type === WidgetType.NOTE) return "노트 ";
      if (Type === WidgetType.DRAWING) return "그림판 ";
      return "캘린더 ";
    };
    const newWidget = {
      widgetType: Type,
      roomId: boardId * 1,
      x: 400,
      y: 200,
      widgetTitle: getName(Type) + String(widgetList.length + 1 + ""),
      widgetImage:
        Type == "note"
          ? "https://dprllohwojeet.cloudfront.net/assets/images/6f427efe-5582-4fc9-a737-f48d9fba8bd7.png"
          : Type == "drawing"
          ? "https://dprllohwojeet.cloudfront.net/assets/images/0b16bc66-e916-494c-9bf6-4202c5e5b84b.png"
          : "https://dprllohwojeet.cloudfront.net/assets/images/d6a63526-b29e-4d07-83cb-77fb889cafb4.png",
    };
    console.log("test");
    // TODO: add api
    await widgetAdd(newWidget);
    const response = await axios.get("/api/widget/" + boardId * 1);
    const newRects = response.data.data.map((data) => {
      return {
        ...data,
        id: data.id.toString(),
      };
    });
    setWidgetList(newRects);
    testYRect(newRects);
  };

  const onClick = (widgetType) => {
    selectAddWidet(widgetType);
    setShowWidgetAddModal(!showWidgetAddModal);
  };

  return (
    <div
      className="modal-wrap"
      onClick={() => setShowWidgetAddModal(!showWidgetAddModal)}
      css={{
        backgroundColor: "rgba(0,0,0,0.4)" /* Black w/ opacity */,
        overflow: "auto" /* Enable scroll if needed */,
        position: "fixed",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        display: showWidgetAddModal ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
        padding: "15px",
        zIndex: 4,
      }}
    >
      <div
        className="modal-contents"
        onClick={(e) => e.stopPropagation()}
        css={{
          width: "100%",
          maxWidth: "800px",
          padding: "15px 40px 35px",
          margin: "0 auto",
          border: "1px solid #777",
          boxShadow: "0 8px 32px 0 rgba(0,0,0,0.25)",
          backgroundColor: "#fff",
          borderRadius: "16px",
        }}
      >
        <div
          className="modal-header"
          css={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p css={{ fontSize: 20, fontWeight: 500 }}>Widget</p>
          <span
            id="close-btn"
            css={{
              width: 50,
              height: 50,
              textAlign: "right",
              float: "right",
              color: "#777",
              fontSize: "26px",
              cursor: "pointer",
            }}
            onClick={() => setShowWidgetAddModal(!showWidgetAddModal)}
          >
            &times;
          </span>
        </div>
        <div
          className="modal-body"
          css={{
            paddingTop: 20,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            rowGap: 30,
            columnGap: 50,
            justifyContent: "center",
          }}
        >
          <WidgetSelectBox
            onClick={() => onClick(WidgetType.NOTE)}
            css={{ cursor: "pointer" }}
          >
            노트 📒
          </WidgetSelectBox>
          <WidgetSelectBox
            onClick={() => onClick(WidgetType.CALENDAR)}
            css={{ cursor: "pointer" }}
          >
            캘린더 🗓️
          </WidgetSelectBox>
          <WidgetSelectBox
            onClick={() => onClick(WidgetType.DRAWING)}
            css={{ cursor: "pointer" }}
          >
            그림판 🎨
          </WidgetSelectBox>
        </div>
      </div>
    </div>
  );
}
