/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import ModalHeader from "../modal/ModalHeader";
import { useRecoilState } from "recoil";
import { showModalState } from "../../utils/atoms";
import { widgetListState } from "../../utils/atoms";
import { WidgetType } from "./WidgetType";

export default function WidgetAddModal() {
  const [showModal, setShowModal] = useRecoilState(showModalState);
  const [widgetList, setWidgetList] = useRecoilState(widgetListState);

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
    const lastWidget = widgetList[widgetList.length - 1];

    const getName = (widgetType) => {
      if (widgetType === WidgetType.NOTE) return "노트 ";
      if (widgetType === WidgetType.DRAWING) return "그림판 ";
      return "캘린더 ";
    };

    const newWidget = {
      id: lastWidget.id + 1,
      type: widgetType,
      name: getName(widgetType) + String(lastWidget.id + 1),
      backgroundColor: "pink",
    };

    const updateWidgetList = [...widgetList, newWidget];
    setWidgetList(updateWidgetList);
  };

  const onClick = (widgetType) => {
    selectAddWidet(widgetType);
    setShowModal(!showModal);
  };

  return (
    <div
      id="modal-wrap"
      css={{
        backgroundColor: "rgba(0,0,0,0.4)" /* Black w/ opacity */,
        overflow: "auto" /* Enable scroll if needed */,
        position: "fixed",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        display: showModal ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
        padding: "15px",
        zIndex: 4,
      }}
    >
      <div
        id="modal-body"
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
        <div id="modal-contents">
          <ModalHeader />
          <div
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
    </div>
  );
}
