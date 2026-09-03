import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Props = ComponentPropsWithoutRef<"div"> & {
  children: ReactNode;
  className?: string;
};

/**
 * The page's one structural unit: a bordered rectangle holding artwork.
 * Panels overlap their neighbours and bleed off the viewport edges — that
 * overlap is the whole comic-page feel. Extra props pass through so sections
 * can tag panels for scroll drift.
 */
export default function Panel({ children, className = "", ...rest }: Props) {
  return (
    <div className={`panel ${className}`} {...rest}>
      {children}
    </div>
  );
}
