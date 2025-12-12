import { redirect } from 'next/navigation';

export default function AdminPage() {
  // Redirect /admin -> the static admin index.html in /public/admin
  redirect('/admin/index.html');
}
