import React, { useState } from 'react';
import { useAdminToken } from '../../hooks/useAdminToken';
import AdminSubmitModal from './AdminSubmitModal';
import './AdminFab.css';

export default function AdminFab() {
  const { token, clear } = useAdminToken();
  const [open, setOpen] = useState(false);

  if (!token) return null;

  return (
    <>
      <button
        type="button"
        className="admin-fab"
        aria-label="관리 메뉴"
        onClick={() => setOpen(true)}
      >
        <span className="admin-fab__plus">+</span>
        <span className="admin-fab__label">register</span>
      </button>
      {open && (
        <AdminSubmitModal
          token={token}
          onClose={() => setOpen(false)}
          onUnauthorized={() => {
            clear();
            setOpen(false);
          }}
        />
      )}
    </>
  );
}
