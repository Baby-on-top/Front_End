/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import plus_green from "../../assets/plus_green.png";
import arrow_left from "../../assets/arrow_left.png";
import arrow_right from "../../assets/arrow_right.png";
import { colors } from "../../utils/colors";

import { useRecoilState } from "recoil";
import { showWidgetAddModalState } from "../../utils/atoms";
import {
  showNavState,
  widgetListState,
  showWidgetDetailModalState,
} from "../../utils/atoms";
import TextTile from "./TextTile";

const SpreadNavWrapper = styled.div`
  position: fixed;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 6px;
  box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.2);
  @media (max-width: 800px) {
    display: none;
  }
  overflow: hidden;
  background-color: white;
  z-index: 3;
`;
const FoldNavWrapper = styled.div`
  position: fixed;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 6px;
  box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.2);
  border-radius: 45px;
  padding: 6px 4px;
  overflow: hidden;
  background-color: white;
  z-index: 3;
`;

/// main
export default function WidgetNav({
  widgetsRef,
  setWidgetType,
  setWidgetId,
  setWidgetTitle,
}) {
  const [showWidgetAddModal, setShowWidgetAddModal] = useRecoilState(
    showWidgetAddModalState
  );
  const [showNav, setShowNav] = useRecoilState(showNavState);
  const [widgetList] = useRecoilState(widgetListState);
  const [showWidgetDetailModal, setShowWidgetDetailModal] = useRecoilState(
    showWidgetDetailModalState
  );

  const moveToWidgetDetail = async (type, id, title) => {
    await widgetsRef.current[id].scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    setWidgetType(type);
    setWidgetId(id);
    setWidgetTitle(title);
    await setTimeout(() => {
      setShowWidgetDetailModal(!showWidgetDetailModal);
    }, 300);
  };

  if (showNav) {
    return WidgetNavSpread(
      widgetList,
      showWidgetAddModal,
      setShowWidgetAddModal,
      showNav,
      setShowNav,
      moveToWidgetDetail
    );
  } else {
    return WidgetNavFold(
      showWidgetAddModal,
      setShowWidgetAddModal,
      showNav,
      setShowNav
    );
  }
}

/// nav 펼침
export function WidgetNavSpread(
  widgetList,
  showWidgetAddModal,
  setShowWidgetAddModal,
  showNav,
  setShowNav,
  moveToWidgetDetail
) {
  return (
    <SpreadNavWrapper>
      <div
        id="widget-nav-header"
        css={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "210px",
          padding: "10px 10px 0px 16px",
        }}
      >
        <div css={{ fontSize: 20, fontWeight: 700 }}>Widgets</div>
        <div css={{ display: "flex", alignItems: "center" }}>
          <div
            onClick={() => setShowWidgetAddModal(!showWidgetAddModal)}
            css={{
              width: 36,
              height: 36,
              textAlign: "center",
              borderRadius: "50%",
              padding: 6,
              cursor: "pointer",
              ":hover": { backgroundColor: colors.overlay_grey },
            }}
          >
            <img
              src={plus_green}
              alt="plus_green"
              css={{ width: 24, height: 24 }}
            />
          </div>
          <div
            onClick={() => setShowNav(!showNav)}
            css={{
              width: 33,
              height: 33,
              textAlign: "center",
              padding: 6,
              borderRadius: "50%",
              cursor: "pointer",
              ":hover": { backgroundColor: colors.overlay_grey },
              marginLeft: 4,
            }}
          >
            <img
              src={arrow_left}
              alt="arrow_left"
              css={{ width: 16, height: 16 }}
            />
          </div>
        </div>
      </div>
      <div
        id="nav-widget-list"
        css={{
          width: "210px",
          margin: "10px 0px",
          minHeight: "260px",
          maxHeight: "420px",
          overflow: "scroll",
        }}
      >
        {widgetList.map((widget) => (
          <TextTile
            widget={widget}
            moveToWidgetDetail={() => moveToWidgetDetail()}
          />
        ))}
      </div>
    </SpreadNavWrapper>
  );
}

/// nav 접음
export function WidgetNavFold(
  showWidgetAddModal,
  setShowWidgetAddModal,
  showNav,
  setShowNav
) {
  return (
    <FoldNavWrapper>
      <div
        onClick={() => setShowWidgetAddModal(!showWidgetAddModal)}
        css={{
          width: 36,
          height: 36,
          textAlign: "center",
          borderRadius: "50%",
          padding: 6,
          cursor: "pointer",
          ":hover": { backgroundColor: colors.overlay_grey },
        }}
      >
        <img
          src={plus_green}
          alt="plus_green"
          css={{ width: 24, height: 24 }}
        />
      </div>
      <div
        onClick={() => setShowNav(!showNav)}
        css={{
          width: 36,
          height: 36,
          textAlign: "center",
          padding: 4,
          borderRadius: "50%",
          cursor: "pointer",
          ":hover": { backgroundColor: colors.overlay_grey },
        }}
      >
        <img
          src={arrow_right}
          alt="arrow_right"
          css={{ width: 28, height: 28 }}
        />
      </div>
    </FoldNavWrapper>
  );
}
