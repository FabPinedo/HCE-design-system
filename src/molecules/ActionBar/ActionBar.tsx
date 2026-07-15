/**
 * ---------------------------------------------------------
 * Component: ActionBar
 * Description:
 * Barra de acciones rápidas para el módulo de emergencia.
 * Agrupa botones icon-only con separadores visuales entre grupos.
 * ---------------------------------------------------------
 */
import { Box, IconButton } from "@mui/material";
import {
  hceBorderRadius,
  hceClinicalColors,
  hceColors,
} from "../../tokens/hce.tokens";
import { ActionIconButton } from "../ActionIconButton/ActionIconButton";
import { Close } from "@mui/icons-material";
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
    <Box
      sx={{
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
      }}
      role="toolbar"
      aria-label="Barra de acciones"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isVertical ? "column" : "row",
          alignItems: isVertical ? "start" : "center",
          gap: "0.5rem",
          padding: "6px 10px",
          backgroundColor: "#ffffff",
          width: isVertical ? "fit-content" : "100%",
        }}
      >
        {closeAction && (
          // <ActionIconButton
          //   key={0}
          //   icon={CloseIcon}
          //   onClick={()=>{console.log("cerrando")}}
          //   disabled={false}
          // />

          <IconButton
            onClick={() => {
              setCloseBar(!closeBar);
            }}
            disabled={false}
            size="small"
            sx={{
              width: 40,
              height: 40,
              borderRadius: hceBorderRadius.lg,
              border: `1.5px solid ${hceColors.primary.blue[600]}`,
              backgroundColor: hceColors.primary.blue[600],
              color: hceClinicalColors.textSecondary,
              padding: 0,

              "&:hover": {
                backgroundColor: hceColors.primary.blue[600],
                borderColor: hceColors.primary.blue[600],
                color: hceColors.primary.blue[600],
              },
              "&:active": {
                backgroundColor: hceColors.primary.blue[600],
              },
              "&.Mui-disabled": {
                opacity: 0.4,
                backgroundColor: "#FFFFFF",
                color: hceClinicalColors.textSecondary,
              },
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: 18, // Mismo tamaño que tus íconos
                height: 18,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* ÍCONO CERRAR (X) */}
              <Box
                sx={{
                  position: "absolute",
                  transition: "opacity 0.2s ease-in-out",
                  opacity: closeBar ? 1 : 0, // Se muestra si closeBar es true
                }}
              >
                <MenuBurgerIcon size={18} color={hceColors.neutro.white[50]} />
              </Box>

              {/* ÍCONO HAMBURGUESA */}
              <Box
                sx={{
                  position: "absolute",
                  transition: "opacity 0.2s ease-in-out",
                  opacity: closeBar ? 0 : 1, // Se muestra si closeBar es false
                }}
              >
                <CloseIcon size={18} color={hceColors.neutro.white[50]} />
              </Box>
            </Box>
          </IconButton>
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
      </Box>
    </Box>
  );
};
