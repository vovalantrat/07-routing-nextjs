"use client"

import { createPortal } from 'react-dom';
import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import css from './Modal.module.css';

interface Props {
  children: React.ReactNode;
  onClose?: () => void;
}

export default function Modal({ children, onClose }: Props) {
  const router = useRouter();
  
  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  }, [onClose, router]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };

    window.addEventListener('keydown', handleKey);

    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKey);

      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
    };
  }, [handleClose]);

  return createPortal(
    <div className={css.backdrop} onClick={handleClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  );
}