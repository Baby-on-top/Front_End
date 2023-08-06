/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useRecoilState } from "recoil";
import { showWidgetAddModalState } from "../../utils/atoms";
import { widgetListState } from "../../utils/atoms";
import { WidgetType } from "./WidgetType";
import { yRects } from "../tldraw/store";
import { useYcanvas } from "./useYCanvasWidget";
import { useEffect } from "react";

export default function WidgetAddModal() {
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

  const selectAddWidet = (widgetType) => {
    if (widgetList.length < 1) {
      return;
    }
    const lastWidget = widgetList[widgetList.length - 1];

    const getName = (widgetType) => {
      if (widgetType === WidgetType.NOTE) return "노트 ";
      if (widgetType === WidgetType.DRAWING) return "그림판 ";
      return "캘린더 ";
    };

    const newWidget = {
      id: lastWidget.id + 10,
      type: widgetType,
      x: 150,
      y: 150,
      name: getName(widgetType) + String(lastWidget.id + 1),
      backgroundColor: "pink",
    };

    const updateWidgetList = [...widgetList, newWidget];
    console.log(updateWidgetList);
    setWidgetList(updateWidgetList);

    console.log(widgetList);
    testYRect(updateWidgetList);

    console.log("11111", widgetList);
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
