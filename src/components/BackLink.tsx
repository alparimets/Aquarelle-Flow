import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  to: string;
  children: string;
}

export default function BackLink({ to, children }: Props) {
  return (
    <Link
      to={to}
      className="group mt-8 inline-flex items-center gap-2 rounded-full border border-terracotta-200 bg-white px-4 py-2 text-sm text-terracotta-700 transition-all duration-300 hover:border-terracotta-300 hover:bg-terracotta-50 hover:shadow-sm"
    >
      <ArrowLeft size={16} aria-hidden className="transition-transform duration-300 group-hover:-translate-x-1" />
      {children}
    </Link>
  );
}
