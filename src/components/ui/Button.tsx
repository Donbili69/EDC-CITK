import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

interface BaseProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

const variantClasses: Record<Variant, string> = {
  primary: "bg-signal text-paper hover:bg-signal-600",
  secondary: "border border-ink/30 text-ink hover:border-ink",
  ghost: "text-ink hover:bg-ink/5",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded px-5 py-2.5 text-small font-medium transition-colors duration-150 disabled:opacity-40 disabled:pointer-events-none";

// Use as a real button:  <Button onClick={...}>Save changes</Button>
// Use as a link:          <Button href="/events">Explore events</Button>
type ButtonProps = BaseProps &
  (
    | ({ href: string } & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className">)
    | ({ href?: undefined } & ComponentPropsWithoutRef<"button">)
  );

export function Button({ variant = "primary", className = "", children, ...props }: ButtonProps) {
  const classes = `${base} ${variantClasses[variant]} ${className}`;

  if ("href" in props && props.href) {
    const { href, ...rest } = props;
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ComponentPropsWithoutRef<"button">)}>
      {children}
    </button>
  );
}
