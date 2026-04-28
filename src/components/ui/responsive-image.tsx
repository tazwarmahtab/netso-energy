import type { ComponentPropsWithoutRef } from "react";

type ResponsiveSource = {
  src: string;
  width: number;
};

type ResponsiveImageProps = Omit<
  ComponentPropsWithoutRef<"img">,
  "src" | "srcSet" | "sizes"
> & {
  sources: ResponsiveSource[];
  sizes: string;
  fallbackSrc?: string;
  fallbackSources?: ResponsiveSource[];
  modernType?: string;
};

const buildSrcSet = (sources: ResponsiveSource[]) =>
  sources.map((source) => `${source.src} ${source.width}w`).join(", ");

export function ResponsiveImage({
  sources,
  sizes,
  fallbackSrc,
  fallbackSources,
  modernType = "image/avif",
  alt,
  ...imgProps
}: ResponsiveImageProps) {
  const orderedModernSources = [...sources].sort((left, right) => left.width - right.width);
  const orderedFallbackSources = fallbackSources
    ? [...fallbackSources].sort((left, right) => left.width - right.width)
    : null;
  const imgSrc =
    fallbackSrc ??
    orderedFallbackSources?.[orderedFallbackSources.length - 1]?.src ??
    orderedModernSources[orderedModernSources.length - 1]?.src;

  return (
    <picture className="block h-full w-full">
      <source
        type={modernType}
        sizes={sizes}
        srcSet={buildSrcSet(orderedModernSources)}
      />
      <img
        {...imgProps}
        alt={alt}
        sizes={sizes}
        src={imgSrc}
        srcSet={orderedFallbackSources ? buildSrcSet(orderedFallbackSources) : undefined}
      />
    </picture>
  );
}
