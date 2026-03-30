import React, { ReactNode, ReactElement } from 'react';
import { FaroErrorBoundary } from '@grafana/faro-react';

interface Props {
  children: ReactNode;
  fallback?: ReactElement;
}

function FallbackUI() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted, #888)' }}>
      <p>예기치 않은 오류가 발생했습니다.</p>
      <button
        onClick={() => window.location.reload()}
        style={{ marginTop: '1rem', cursor: 'pointer' }}
      >
        다시 시도
      </button>
    </div>
  );
}

function ErrorBoundary({ children, fallback }: Props) {
  return (
    <FaroErrorBoundary fallback={fallback ?? <FallbackUI />}>
      {children}
    </FaroErrorBoundary>
  );
}

export default ErrorBoundary;
