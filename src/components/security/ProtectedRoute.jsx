import React from 'react';
import AccessRestrictedCard from './AccessRestrictedCard';

export function isCorporateOperator(user) {
  if (!user || !user.email) return false;
  const cleanEmail = user.email.trim().toLowerCase();
  return cleanEmail.endsWith('@siliconbrain.ai') || cleanEmail === 'analyst@siliconbrain.ai';
}

export default function ProtectedRoute({
  currentUser,
  children,
  t,
  lang,
  setLang,
  onGoHome,
  onAutofillAnalyst
}) {
  // If user is not authenticated or not from @siliconbrain.ai, lock the dashboard
  if (!currentUser || !isCorporateOperator(currentUser)) {
    return (
      <AccessRestrictedCard
        t={t}
        lang={lang}
        setLang={setLang}
        onAutofillAnalyst={onAutofillAnalyst}
        onGoHome={onGoHome}
        attemptedEmail={currentUser?.email || null}
      />
    );
  }

  // Authorized corporate operator: grant access to internal dashboard modules
  return <>{children}</>;
}
