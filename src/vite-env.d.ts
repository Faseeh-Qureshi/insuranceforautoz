/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string;
  readonly VITE_CALL_PHONE_E164?: string;
  readonly VITE_COMPANY_ADDRESS_LINE1?: string;
  readonly VITE_COMPANY_ADDRESS_LINE2?: string;
  readonly VITE_PRIVACY_POLICY_URL?: string;
  readonly VITE_TERMS_OF_USE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
