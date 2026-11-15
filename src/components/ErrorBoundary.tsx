import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}
interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Unhandled UI error', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert" className="mx-auto mt-16 max-w-md rounded-2xl border border-paper-edge bg-paper-card p-6 text-center shadow-card">
          <h2 className="mb-2 text-xl">Let's take a breath</h2>
          <p className="mb-4">Something went a little sideways. Your sketchbook is safe, so let's try again.</p>
          <button
            className="rounded-full bg-sap-dark px-5 py-2 text-white transition-colors duration-300 hover:bg-ink"
            onClick={() => this.setState({ hasError: false })}
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
