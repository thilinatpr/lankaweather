// app/admin/page.tsx
import AdminLayout from '@/components/admin/AdminLayout';
import AlertManagement from '@/components/admin/AlertManagement';
import { AlertProvider } from '@/contexts/AlertContext';

export default function AdminPage() {
  return (
    <AlertProvider>
      <AdminLayout>
        <AlertManagement />
      </AdminLayout>
    </AlertProvider>
  );
}