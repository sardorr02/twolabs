interface SectionProps {
  id?: string;
  label: string;
  children: React.ReactNode;
  className?: string;
}

export default function Section({ id, label, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={className}>
      <div className="container">
        <div className="label reveal">{label}</div>
        {children}
      </div>
    </section>
  );
}
