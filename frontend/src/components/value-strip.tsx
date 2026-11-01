import type { ReactNode } from "react";

type ValueItemProps = {
  icon: ReactNode;
  label: string;
};

function ValueItem({ icon, label }: ValueItemProps) {
  return (
    <div className="value-item">
      <span className="value-icon" aria-hidden="true">
        {icon}
      </span>
      <span>{label}</span>
    </div>
  );
}

function AlterationsIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none">
      <circle cx="7" cy="25" r="4" />
      <circle cx="25" cy="25" r="4" />
      <path d="m10 22 13-18M22 22 9 4M12.5 18.5h7" />
    </svg>
  );
}

function MaterialsIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none">
      <path d="M27 5C15 6 7 12 6 23c10 2 19-5 21-18Z" />
      <path d="M4 28c5-8 10-12 18-17" />
    </svg>
  );
}

function DeliveryIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none">
      <path d="m5 9 11-5 11 5v14l-11 5-11-5V9Z" />
      <path d="m5 9 11 5 11-5M16 14v14M10.5 6.5l11 5" />
    </svg>
  );
}

export function ValueStrip() {
  return (
    <section className="value-strip" aria-label="Aureon services">
      <ValueItem icon={<AlterationsIcon />} label="Complimentary alterations" />
      <ValueItem icon={<MaterialsIcon />} label="Responsible materials" />
      <ValueItem icon={<DeliveryIcon />} label="Delivery & returns" />
    </section>
  );
}
