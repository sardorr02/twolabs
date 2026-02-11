interface ScalingCardProps {
  label: string;
  value: string;
  description: string;
}

export default function ScalingCard({ label, value, description }: ScalingCardProps) {
  return (
    <div className="scaling-card">
      <span className="card-label">{label}</span>
      <span className="card-value">{value}</span>
      <span className="card-desc">{description}</span>
    </div>
  );
}
