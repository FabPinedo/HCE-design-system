import type { ComponentType } from "react"
import {
  LogoCSFIcon,
  LogoSannaIcon,
  LogoSannaIsotipoIcon,
  LogoUnknownIcon,
  LogoUnknownIsotipoIcon,
  UiIsotipoClinicaIcon,
} from "../atoms/Icon/SvgIconsHce"
import type { CompanyThemeKey } from "../tokens/companies.tokens"

export type CompanyLogoProps = {
  width?: number
  color?: string
}

export type CompanyIsotypeProps = {
  size?: number
  color?: string
}

export type CompanyBranding = {
  Logo: ComponentType<CompanyLogoProps>
  Isotype: ComponentType<CompanyIsotypeProps>
}

// Los adapters normalizan las props de los SVG aunque cada logo original
// tenga una firma diferente. Los consumidores no necesitan conocer esos
// detalles ni preguntar qué empresa está activa.
const CsfLogo = ({ width }: CompanyLogoProps) => <LogoCSFIcon width={width} />

const companyBranding = {
  default: {
    Logo: CsfLogo,
    Isotype: UiIsotipoClinicaIcon,
  },
  csf: {
    Logo: CsfLogo,
    Isotype: UiIsotipoClinicaIcon,
  },
  sanna: {
    Logo: LogoSannaIcon,
    Isotype: LogoSannaIsotipoIcon,
  },
  unknown: {
    Logo: LogoUnknownIcon,
    Isotype: LogoUnknownIsotipoIcon,
  },
} satisfies Record<CompanyThemeKey, CompanyBranding>

/** Devuelve la identidad visual del tenant activo. */
export function getCompanyBranding(tenant: CompanyThemeKey): CompanyBranding {
  return companyBranding[tenant]
}
