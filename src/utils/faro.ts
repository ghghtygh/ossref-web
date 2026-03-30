import {
  initializeFaro,
  getWebInstrumentations,
  type Faro,
} from '@grafana/faro-web-sdk';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';
import { ReactIntegration } from '@grafana/faro-react';

const COLLECTOR_URL = process.env.REACT_APP_FARO_COLLECTOR_URL ?? '';

let faro: Faro | null = null;

export function initFaro(): Faro | null {
  if (!COLLECTOR_URL) {
    console.warn('[Faro] REACT_APP_FARO_COLLECTOR_URL이 설정되지 않았습니다. 모니터링이 비활성화됩니다.');
    return null;
  }

  faro = initializeFaro({
    url: COLLECTOR_URL,
    app: {
      name: 'ossref-web',
      version: process.env.REACT_APP_VERSION ?? '0.1.0',
      environment: process.env.NODE_ENV,
    },
    instrumentations: [
      ...getWebInstrumentations(),
      new TracingInstrumentation(),
      new ReactIntegration(),
    ],
  });

  return faro;
}

export function getFaro(): Faro | null {
  return faro;
}
