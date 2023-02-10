import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    const retry = (e: React.MouseEvent<HTMLSpanElement>) => {
      e.preventDefault();
      this.setState({ hasError: false });
    };
    if (this.state.hasError) {
      return (
      <h1 className="text-white">Sorry.. there was an error. <span className="cursor-pointer" onClick={(e) => retry(e)}>Try Again</span></h1>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;