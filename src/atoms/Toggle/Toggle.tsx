import { Box } from "@mui/material"
import { useId } from "react"
import { hceColors } from "../../tokens/hce.tokens"

export interface ToggleProps {
  checked: boolean
  onChange: (v: boolean) => void
  disabled?: boolean
}

/** Switch on/off. */
export function Toggle({ checked, onChange, disabled = false }: ToggleProps) {
  const id = useId()
  return (
    <Box
      component="label"
      htmlFor={id}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <Box
        component="input"
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.checked)
        }
        sx={{ display: "none" }}
      />
      {/* Sin onClick propio: el <label> ya reenvía el click nativamente al <input>
          oculto de arriba. Agregar un onClick acá duplicaba el toggle (ambos disparan
          en el mismo click, con el mismo `checked` obsoleto) y podía anular el cambio. */}
      <Box
        sx={{
          width: 44,
          height: 24,
          borderRadius: "12px",
          backgroundColor: checked
            ? hceColors.primary.blue[600]
            : hceColors.neutro.black[300],
          position: "relative",
          cursor: disabled ? "not-allowed" : "pointer",
          transition: "background-color 220ms",
          flexShrink: 0,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 2,
            left: checked ? 20 : 2,
            width: 20,
            height: 20,
            borderRadius: "50%",
            backgroundColor: "#ffffff",
            transition: "left 220ms",
            boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
          }}
        />
      </Box>
    </Box>
  )
}
