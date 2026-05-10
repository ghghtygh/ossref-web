const API_BASE = process.env.REACT_APP_API_BASE_URL ?? '/api';

export interface SubmitRepoPayload {
  url: string;
  note?: string;
  fw?: string;
  arch?: string;
  archDescription?: string;
}

export interface SubmitRepoResult {
  id: number;
  owner: string;
  name: string;
  url: string;
  fw: string;
  arch: string;
  archDescription: string;
}

export class AdminApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'AdminApiError';
  }
}

export async function submitRepo(
  token: string,
  payload: SubmitRepoPayload
): Promise<SubmitRepoResult> {
  const cleanedBody = Object.fromEntries(
    Object.entries(payload).filter(([, v]) => v !== undefined && v !== '')
  );

  const res = await fetch(`${API_BASE}/admin/repos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Admin-Token': token,
    },
    body: JSON.stringify(cleanedBody),
  });

  if (!res.ok) {
    let message = `요청 실패: HTTP ${res.status}`;
    try {
      const body = await res.json();
      if (body?.message) message = body.message;
    } catch {
      /* body가 JSON이 아니면 무시 */
    }
    throw new AdminApiError(res.status, message);
  }

  return (await res.json()) as SubmitRepoResult;
}
