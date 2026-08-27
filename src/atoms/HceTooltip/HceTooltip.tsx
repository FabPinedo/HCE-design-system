import { hceColors, hceTypography } from "../../tokens/hce.tokens";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { useDsTheme } from "../../provider/ThemeProvider";
import "./HceTooltip.css"
/**
 * Tooltip — reemplazo propio de `Tooltip` de MUI. Usa `createPortal` a
 * `document.body` con reposicionamiento dinámico (vía getBoundingClientRect
 * en `resize`/`scroll`), similar en espíritu a Popper pero SIN
 * collision-detection horizontal completa: el eje X se clampa a los bordes
 * del viewport, el eje Y NO (limitación conocida y aceptada).
 *
 * Si `title` es un string vacío, no se renderiza tooltip (igual que MUI).
 */

export interface TooltipProps {
  title: ReactNode;
  children: ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
  arrow?: boolean;
  className?: string;
  style?: CSSProperties;
  bubbleStyle?: CSSProperties;
  bubbleClassName?: string;
}

const HIDE_DELAY_MS = 80;

const Tooltip = ({
  title,
  children,
  placement = "top",
  arrow = false,
  className,
  style,
  bubbleStyle,
  bubbleClassName,
}: TooltipProps) => {
  const dsTheme = useDsTheme();
  const triggerRef = useRef<HTMLSpanElement>(null);
  const bubbleRef = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: -9999, left: -9999 });

  // --- FIX #2: rastreamos hover del trigger y del bubble por separado,
  // porque el bubble vive en un portal y NO es descendiente del wrapper.
  // Sin esto, mover el mouse del ícono hacia el tooltip dispara
  // pointerleave del wrapper y lo cierra antes de poder interactuar.
  const overTriggerRef = useRef(false);
  const overBubbleRef = useRef(false);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleHide = useCallback(() => {
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    hideTimeoutRef.current = setTimeout(() => {
      if (!overTriggerRef.current && !overBubbleRef.current) {
        setVisible(false);
      }
    }, HIDE_DELAY_MS);
  }, []);

  const showTooltip = useCallback(() => {
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    hideTimeoutRef.current = null;
    setVisible(true);
  }, []);

  const hideTooltip = useCallback(() => {
    overTriggerRef.current = false;
    overBubbleRef.current = false;
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    hideTimeoutRef.current = null;
    setVisible(false);
  }, []);

  const updatePosition = useCallback(() => {
    const trigger = triggerRef.current;
    const bubble = bubbleRef.current;
    if (!trigger || !bubble) return;

    const anchor = trigger.getBoundingClientRect();
    const floating = bubble.getBoundingClientRect();
    const gap = 8;
    const next =
      placement === "bottom"
        ? {
            top: anchor.bottom + gap,
            left: anchor.left + (anchor.width - floating.width) / 2,
          }
        : placement === "left"
          ? {
              top: anchor.top + (anchor.height - floating.height) / 2,
              left: anchor.left - floating.width - gap,
            }
          : placement === "right"
            ? {
                top: anchor.top + (anchor.height - floating.height) / 2,
                left: anchor.right + gap,
              }
            : {
                top: anchor.top - floating.height - gap,
                left: anchor.left + (anchor.width - floating.width) / 2,
              };

    const viewportLeft = Math.max(
      4,
      Math.min(next.left, window.innerWidth - floating.width - 4),
    );

    // FIX #4: clamp vertical básico. No es collision-detection completo
    // (no hace auto-flip de placement), solo evita que el bubble quede
    // renderizado fuera del viewport arriba/abajo.
    const viewportTop = Math.max(
      4,
      Math.min(next.top, window.innerHeight - floating.height - 4),
    );

    setPosition({
      top: viewportTop + window.scrollY,
      left: viewportLeft + window.scrollX,
    });
  }, [placement]);

  useEffect(() => {
    if (!visible) return;

    const handleVisibilityChange = () => {
      if (document.visibilityState !== "visible") {
        hideTooltip();
      }
    };

    // FIX #1: ignoramos el pointerdown si cae dentro del trigger o del
    // bubble. Sin este chequeo, en touch el propio tap que abre el
    // tooltip (pointerenter -> pointerdown, mismo gesto) llega a este
    // listener global y lo cierra en el mismo frame.
    const handlePointerDownOutside = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (
        target &&
        (triggerRef.current?.contains(target) ||
          bubbleRef.current?.contains(target))
      ) {
        return;
      }
      hideTooltip();
    };

    window.addEventListener("blur", hideTooltip);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("pointerdown", handlePointerDownOutside, true);

    return () => {
      window.removeEventListener("blur", hideTooltip);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener(
        "pointerdown",
        handlePointerDownOutside,
        true,
      );
    };
  }, [visible, hideTooltip]);

  useLayoutEffect(() => {
    if (!visible) return;
    updatePosition();

    // FIX #5: throttle simple del scroll vía rAF para no disparar un
    // setState por cada evento de scroll (puede ser docenas por segundo).
    let rafId: number | null = null;
    const onScrollOrResize = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        updatePosition();
      });
    };

    window.addEventListener("resize", onScrollOrResize);
    window.addEventListener("scroll", onScrollOrResize, true);
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onScrollOrResize);
      window.removeEventListener("scroll", onScrollOrResize, true);
    };
  }, [visible, updatePosition]);

  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  if (!title) return <>{children}</>;

  return (
    <span
      ref={triggerRef}
      className={`hce-tooltip-wrapper${className ? ` ${className}` : ""}`}
      style={style}
      onPointerEnter={() => {
        overTriggerRef.current = true;
        showTooltip();
      }}
      onPointerLeave={() => {
        overTriggerRef.current = false;
        scheduleHide();
      }}
      onFocusCapture={(event) => {
        const target = event.target;
        if (target instanceof HTMLElement && target.matches(":focus-visible")) {
          overTriggerRef.current = true;
          showTooltip();
        }
      }}
      onBlurCapture={() => {
        overTriggerRef.current = false;
        scheduleHide();
      }}
    >
      {children}
      {visible &&
        typeof document !== "undefined" &&
        createPortal(
          <span
            ref={bubbleRef}
            role="tooltip"
            className={`hce-tooltip-bubble hce-tooltip-bubble--portal hce-tooltip-bubble--visible hce-tooltip-bubble--${placement}${bubbleClassName ? ` ${bubbleClassName}` : ""}`}
            style={
              {
                ...dsTheme,
                ...bubbleStyle,
                top: position.top,
                left: position.left,
                right: "auto",
                bottom: "auto",
                transform: "none",
              } as CSSProperties
            }
            // FIX #2 (parte 2): mantener visible mientras el pointer esté
            // sobre el propio bubble, y permitir click dentro sin que el
            // listener de pointerdown lo cierre (ver handlePointerDownOutside).
            onPointerEnter={() => {
              overBubbleRef.current = true;
              showTooltip();
            }}
            onPointerLeave={() => {
              overBubbleRef.current = false;
              scheduleHide();
            }}
          >
            {title}
            {arrow && <span className="hce-tooltip-bubble__arrow" />}
          </span>,
          document.body,
        )}
    </span>
  );
};

export const HceTooltip = ({
  children,
  arrow = true,
  ...props
}: TooltipProps) => {
  return (
    <Tooltip
      arrow={arrow}
      {...props}
      bubbleStyle={{
        backgroundColor: `var(--ds-color-interactive-button, ${hceColors.primary.green[600]})`,
        color: "#ffffff",
        fontSize: "0.72rem",
        fontWeight: 700,
        fontFamily: hceTypography.fontFamily,
        borderRadius: "8px",
        padding: "6px 12px",
        boxShadow: "0 4px 14px rgba(0,0,0,0.20)",
        letterSpacing: "0.02em",
        whiteSpace: "nowrap",
        ...props.bubbleStyle,
      }}
    >
      {children}
    </Tooltip>
  );
};
