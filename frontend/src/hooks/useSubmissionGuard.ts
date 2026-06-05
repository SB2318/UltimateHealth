import {useCallback, useRef, useState} from 'react';

export function useSubmissionGuard(externalPending = false) {
  const lockRef = useRef(false);
  const [internalPending, setInternalPending] = useState(false);

  const acquire = useCallback(() => {
    if (lockRef.current || externalPending) {
      return false;
    }

    lockRef.current = true;
    setInternalPending(true);
    return true;
  }, [externalPending]);

  const release = useCallback(() => {
    lockRef.current = false;
    setInternalPending(false);
  }, []);

  return {
    acquire,
    release,
    isGuarded: externalPending || internalPending,
  };
}
