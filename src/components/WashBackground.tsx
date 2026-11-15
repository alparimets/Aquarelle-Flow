export default function WashBackground() {
  const blobs = [
    { color: '#7A9A65', className: '-left-24 -top-20 h-80 w-80', radius: '62% 38% 55% 45% / 48% 60% 40% 52%' },
    { color: '#D46A7E', className: '-right-28 top-1/4 h-96 w-96', radius: '45% 55% 38% 62% / 58% 42% 58% 42%' },
    { color: '#E2A856', className: '-bottom-24 left-1/4 h-72 w-96', radius: '55% 45% 60% 40% / 40% 58% 42% 60%' },
    { color: '#6BA3BE', className: '-bottom-32 -right-20 h-80 w-80', radius: '40% 60% 46% 54% / 60% 40% 60% 40%' },
  ];
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      {blobs.map(({ color, className, radius }) => (
        <div
          key={color}
          className={`wash-blob ${className}`}
          style={{ background: `radial-gradient(circle at 40% 40%, ${color}, transparent 70%)`, borderRadius: radius }}
        />
      ))}
    </div>
  );
}
