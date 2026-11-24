import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Use sparingly — the corner-bracket motif marks something as featured,
   *  not every card on the page. See globals.css .bracket for the rule. */
  featured?: boolean;
}

export function Card({ featured = false, className = "", children, ...props }: CardProps) {
  return (
    <div
      className={`border border-line bg-paper ${featured ? "bracket" : ""} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
