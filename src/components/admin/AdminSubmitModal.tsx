import React, { useEffect, useRef, useState } from 'react';
import {
  AdminApiError,
  SubmitRepoPayload,
  SubmitRepoResult,
  submitRepo,
} from '../../api/admin';
import './AdminSubmitModal.css';

interface Props {
  token: string;
  onClose: () => void;
  onUnauthorized: () => void;
}

export default function AdminSubmitModal({ token, onClose, onUnauthorized }: Props) {
  const [url, setUrl] = useState('');
  const [note, setNote] = useState('');
  const [fw, setFw] = useState('');
  const [arch, setArch] = useState('');
  const [archDescription, setArchDescription] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<SubmitRepoResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setResult(null);

    const payload: SubmitRepoPayload = { url, note, fw, arch, archDescription };
    try {
      const r = await submitRepo(token, payload);
      setResult(r);
    } catch (err) {
      if (err instanceof AdminApiError) {
        if (err.status === 401) {
          onUnauthorized();
          return;
        }
        setError(err.message);
      } else {
        setError(err instanceof Error ? err.message : String(err));
      }
    } finally {
      setSubmitting(false);
    }
  }

  function handleAnother() {
    setResult(null);
    setError(null);
    setUrl('');
    setNote('');
    setFw('');
    setArch('');
    setArchDescription('');
    setShowAdvanced(false);
  }

  return (
    <div className="admin-modal__overlay" onClick={onClose}>
      <div
        ref={dialogRef}
        className="admin-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="admin-modal__header">
          <h2 id="admin-modal-title" className="admin-modal__title">
            레포 등록
          </h2>
          <button
            type="button"
            className="admin-modal__close"
            aria-label="닫기"
            onClick={onClose}
          >
            ×
          </button>
        </header>

        {result ? (
          <div className="admin-modal__result">
            <div className="admin-modal__result-eyebrow">등록 완료</div>
            <h3 className="admin-modal__result-name">
              {result.owner}/{result.name}
            </h3>
            <div className="admin-modal__result-tags">
              <span className="admin-modal__tag admin-modal__tag--fw">{result.fw}</span>
              <span className="admin-modal__tag admin-modal__tag--arch">{result.arch}</span>
            </div>
            <p className="admin-modal__result-desc">{result.archDescription}</p>
            <div className="admin-modal__actions">
              <button type="button" className="admin-modal__btn" onClick={handleAnother}>
                다른 레포 등록
              </button>
              <button
                type="button"
                className="admin-modal__btn admin-modal__btn--primary"
                onClick={onClose}
              >
                완료
              </button>
            </div>
          </div>
        ) : (
          <form className="admin-modal__form" onSubmit={handleSubmit}>
            <label className="admin-modal__field">
              <span className="admin-modal__label">GitHub URL *</span>
              <input
                className="admin-modal__input"
                type="url"
                required
                placeholder="https://github.com/owner/repo"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                autoFocus
              />
            </label>

            <label className="admin-modal__field">
              <span className="admin-modal__label">메모 (인사이트 한두 줄)</span>
              <textarea
                className="admin-modal__textarea"
                rows={2}
                placeholder="이 레포의 학습 가치를 한 줄로"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                maxLength={1000}
              />
            </label>

            <button
              type="button"
              className="admin-modal__advanced-toggle"
              onClick={() => setShowAdvanced((v) => !v)}
            >
              {showAdvanced ? '▾' : '▸'} 분류 직접 지정 (선택)
            </button>

            {showAdvanced && (
              <div className="admin-modal__advanced">
                <label className="admin-modal__field">
                  <span className="admin-modal__label">fw</span>
                  <input
                    className="admin-modal__input"
                    type="text"
                    placeholder="spring / nestjs / fastapi ..."
                    value={fw}
                    onChange={(e) => setFw(e.target.value)}
                  />
                </label>
                <label className="admin-modal__field">
                  <span className="admin-modal__label">arch</span>
                  <input
                    className="admin-modal__input"
                    type="text"
                    placeholder="layered / hexagonal / clean / modular ..."
                    value={arch}
                    onChange={(e) => setArch(e.target.value)}
                  />
                </label>
                <label className="admin-modal__field">
                  <span className="admin-modal__label">archDescription</span>
                  <textarea
                    className="admin-modal__textarea"
                    rows={2}
                    placeholder="명시 시 note보다 우선"
                    value={archDescription}
                    onChange={(e) => setArchDescription(e.target.value)}
                  />
                </label>
              </div>
            )}

            {error && <div className="admin-modal__error">{error}</div>}

            <div className="admin-modal__actions">
              <button type="button" className="admin-modal__btn" onClick={onClose}>
                취소
              </button>
              <button
                type="submit"
                className="admin-modal__btn admin-modal__btn--primary"
                disabled={submitting || !url}
              >
                {submitting ? '등록 중...' : '등록'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
