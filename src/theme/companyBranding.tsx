import type { ComponentType } from "react"
import {
  LogoCSFIcon,
  LogoSannaIcon,
  LogoSannaIsotipoIcon,
  LogoUnknownIcon,
  LogoUnknownIsotipoIcon,
  UiIsotipoClinicaIcon,
} from "../atoms/Icon/SvgIconsHce"
import { CSFSpinner } from "../molecules/CSFLoading/CSFLoading"
import { useDsTenant } from "../provider/ThemeProvider"
import type { CompanyThemeKey } from "../tokens/companies.tokens"

export type CompanyLogoProps = {
  width?: number
  color?: string
}

export type CompanyIsotypeProps = {
  size?: number
  color?: string
}

export type CompanyLoadingIndicatorProps = {
  size?: number
  duration?: number
  frameDuration?: number
  color?: string
}

export type CompanyBranding = {
  /** Valor estable para formularios y payloads del tenant. */
  selectValue: string
  /** Nombre legible de la empresa. */
  displayName: string
  Logo: ComponentType<CompanyLogoProps>
  Isotype: ComponentType<CompanyIsotypeProps>
  LoadingIndicator: ComponentType<CompanyLoadingIndicatorProps>
}

// Los adapters normalizan las props de los SVG aunque cada logo original
// tenga una firma diferente. Los consumidores no necesitan conocer esos
// detalles ni preguntar qué empresa está activa.
const CsfLogo = ({ width }: CompanyLogoProps) => <LogoCSFIcon width={width} />

function SannaLoadingIndicator({
  size = 150,
  duration = 1.5,
  color = "var(--ds-color-primary, #2aad3d)",
}: CompanyLoadingIndicatorProps) {
  return (
    <span
      className="hce-brand-loading-indicator"
      style={{
        "--loading-size": `${size}px`,
        "--loading-duration": `${duration}s`,
        "--loading-color": color,
      } as React.CSSProperties}
    >
      <LogoSannaIsotipoIcon size={Math.round(size * 0.48)} color={color} />
    </span>
  )
}

function UnknownLoadingIndicator({
  size = 150,
  duration = 1.5,
  color = "var(--ds-color-primary, #334155)",
}: CompanyLoadingIndicatorProps) {
  return (
    <span
      className="hce-brand-loading-indicator"
      style={{
        "--loading-size": `${size}px`,
        "--loading-duration": `${duration}s`,
        "--loading-color": color,
      } as React.CSSProperties}
    >
      <LogoUnknownIsotipoIcon size={Math.round(size * 0.48)} color={color} />
    </span>
  )
}

const companyBranding = {
  default: {
    selectValue: "clinica-san-felipe",
    displayName: "Clínica San Felipe",
    Logo: CsfLogo,
    Isotype: UiIsotipoClinicaIcon,
    LoadingIndicator: CSFSpinner,
  },
  csf: {
    selectValue: "clinica-san-felipe",
    displayName: "Clínica San Felipe",
    Logo: CsfLogo,
    Isotype: UiIsotipoClinicaIcon,
    LoadingIndicator: CSFSpinner,
  },
  sanna: {
    selectValue: "sanna",
    displayName: "Sanna",
    Logo: LogoSannaIcon,
    Isotype: LogoSannaIsotipoIcon,
    LoadingIndicator: SannaLoadingIndicator,
  },
  unknown: {
    selectValue: "unknown",
    displayName: "Empresa desconocida",
    Logo: LogoUnknownIcon,
    Isotype: LogoUnknownIsotipoIcon,
    LoadingIndicator: UnknownLoadingIndicator,
  },
} satisfies Record<CompanyThemeKey, CompanyBranding>

/** Devuelve la identidad visual del tenant activo. */
export function getCompanyBranding(tenant: CompanyThemeKey): CompanyBranding {
  return companyBranding[tenant]
}

/** Identidad visual y metadata de la empresa activa en DSProvider. */
export function useCompanyBranding(): CompanyBranding {
  return getCompanyBranding(useDsTenant())
}

export function getCompanyName(tenant: CompanyThemeKey): string {
  return companyBranding[tenant].displayName
}