import "./SectionHeader.css"

export interface SectionHeaderProps {
  title: string
  expanded: boolean
  onToggle: () => void
}

/** Header clickeable de sección desplegable, con chevron animado. */
export function SectionHeader({ title, expanded, onToggle }: SectionHeaderProps) {
  return (
    <button
      type="button"
      className="hce-section-header"
      onClick={onToggle}
      aria-expanded={expanded}
    >
      <span
        style={{
          color: "currentColor",
          fontFamily: "var(--ds-font-family, 'Poppins', sans-serif)",
          fontWeight: 600,
          fontSize: "0.9rem",
        }}
      >
        {title}
      </span>
      <span
        style={{
          color: "currentColor",
          fontSize: "18px",
          lineHeight: 1,
          display: "inline-block",
          transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 220ms",
        }}
      >
        ▾
      </span>
    </button>
  )
}
