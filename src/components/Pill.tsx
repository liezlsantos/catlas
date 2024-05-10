import React from "react";
import "styles/Pill.scss";

interface PillProps {
  label: string;
}

const Pill: React.FC<PillProps> = ({ label }) => (
  <div className="pill">{label}</div>
);

export default Pill;
