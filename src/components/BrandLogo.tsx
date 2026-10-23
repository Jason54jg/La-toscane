import Image from "next/image";

type BrandLogoProps = {
  className?: string;
  /** Taille en pixels (carré). */
  size?: number;
  /** Variante extraite du flyer ou SVG vectoriel. */
  variant?: "svg" | "photo";
  priority?: boolean;
};

export function BrandLogo({
  className = "",
  size = 44,
  variant = "svg",
  priority = false,
}: BrandLogoProps) {
  const src =
    variant === "photo"
      ? "/images/logo-toscane-photo.png"
      : "/images/logo-toscane.svg";

  return (
    <Image
      src={src}
      alt=""
      width={size}
      height={size}
      className={`shrink-0 object-contain ${className}`}
      priority={priority}
      aria-hidden
    />
  );
}
