import { Link } from 'react-router-dom';

interface Props {
  message: string;
}

export default function EmptyState({ message }: Props) {
  return (
    <div className="text-center">
      <p className="mb-4">{message}</p>
      <Link to="/" className="text-terracotta-700 underline">
        Back to start
      </Link>
    </div>
  );
}
