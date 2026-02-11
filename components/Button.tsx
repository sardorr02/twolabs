interface ButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function Button({ href, children, className = '' }: ButtonProps) {
  return (
    <a href={href} className={`btn ${className}`}>
      <span>{children}</span>
    </a>
  );
}
