export default function Sparkline({ data, width = 56, height = 20, color = "#0071e3" }) {
  if (!data || data.length === 0) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const stepX = width / (data.length - 1);

  const points = data.map((v, i) => {
    const x = i * stepX;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return [x, y];
  });

  const path = points
    .map((p, i) => (i === 0 ? `M ${p[0]},${p[1]}` : `L ${p[0]},${p[1]}`))
    .join(" ");

  const last = points[points.length - 1];
  const rising = data[data.length - 1] >= data[0];

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="shrink-0">
      <path d={path} className="sparkline-path" stroke={rising ? "#047857" : color} />
      <circle cx={last[0]} cy={last[1]} r="1.8" fill={rising ? "#047857" : color} />
    </svg>
  );
}
