/**
 * ---------------------------------------------------------
 * Component: ActionBar
 * Description:
 * Barra de acciones rápidas para el módulo de emergencia.
 * Agrupa botones icon-only con separadores visuales entre grupos.
 * ---------------------------------------------------------
 */
import "./ActionBar.css";
import {
  hceColors,
} from "../../tokens/hce.tokens";
import { ActionIconButton } from "../ActionIconButton/ActionIconButton";
import { CloseIcon, MenuBurgerIcon } from "../../atoms/Icon/SvgIcons";
import { useState } from "react";

/** Definición de un botón adicional personalizado */
export interface ExtraAction {
  id: string;
  icon: React.ElementType;
  onClick?: () => void;
  disabled?: boolean;
  labelTooltip: string;
}

interface Props {
  orientation?: "horizontal" | "vertical";
  /** Botones adicionales (aparecen después del separador principal) */
  actions?: ExtraAction[];
  /** Boton adicional para ocultar o mostrar barra de botones */
  closeAction?: boolean;
}

/**
 * ActionBar
 *
 * Barra horizontal con fondo blanco y borde inferior sutil.
 */
export const ActionBar = ({
  orientation = "horizontal",
  actions,
  closeAction,
}: Props) => {
  const isVertical = orientation === "vertical";
  const [closeBar, setCloseBar] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: isVertical ? "column" : "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "6px",
        padding: "6px 10px",
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        boxShadow: `0 2px 8px rgba(0,29,69,0.08)`,
        border: `1px solid ${hceColors.primary.blue[100]}`,
        width: isVertical ? "fit-content" : "100%",
        boxSizing: "border-box",
      }}
      role="toolbar"
      aria-label="Barra de acciones"
    >
      <div
        style={{
          display: "flex",
          flexDirection: isVertical ? "column" : "row",
          alignItems: isVertical ? "start" : "center",
          gap: "0.5rem",
          padding: "6px 10px",
          backgroundColor: "#ffffff",
          width: isVertical ? "fit-content" : "100%",
          boxSizing: "border-box",
        }}
      >
        {closeAction && (
          <button
            type="button"
            className="hce-actionbar-close-btn"
            onClick={() => {
              setCloseBar(!closeBar);
            }}
            disabled={false}
          >
            <div
              style={{
                position: "relative",
                width: 18,
                height: 18,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* ÍCONO CERRAR (X) */}
              <div
                style={{
                  position: "absolute",
                  transition: "opacity 0.2s ease-in-out",
                  opacity: closeBar ? 1 : 0,
                }}
              >
                <MenuBurgerIcon size={18} color={hceColors.neutro.white[50]} />
              </div>

              {/* ÍCONO HAMBURGUESA */}
              <div
                style={{
                  position: "absolute",
                  transition: "opacity 0.2s ease-in-out",
                  opacity: closeBar ? 0 : 1,
                }}
              >
                <CloseIcon size={18} color={hceColors.neutro.white[50]} />
              </div>
            </div>
          </button>
        )}
        {!closeBar &&
          actions?.map((action) => (
            <ActionIconButton
              key={action.id}
              tooltip={action.labelTooltip}
              icon={action.icon}
              onClick={action.onClick}
              disabled={action.disabled}
            />
          ))}
      </div>
    </div>
  );
};
