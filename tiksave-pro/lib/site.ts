export const SITE_NAME = 'TikSave Pro';
export const SITE_DESCRIPTION = 'A creator-first toolkit for backing up your own public TikTok videos and planning a more reliable short-form workflow.';
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://tiksavepro.vercel.app').replace(/\/$/, '');
export const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'liaqatalicontact001@gmail.com';
export const absoluteUrl = (path: string) => new URL(path, `${SITE_URL}/`).toString();
