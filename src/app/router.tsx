import { createBrowserRouter, Navigate } from 'react-router-dom'
import LandingPage from '@/pages/(public)/LandingPage'
import LoginPage from '@/pages/(public)/LoginPage'
import RegisterPage from '@/pages/(public)/RegisterPage'
import PricingPage from '@/pages/(public)/PricingPage'
import ForgotPasswordPage from '@/pages/(public)/ForgotPasswordPage'
import DashboardPage from '@/pages/(app)/DashboardPage'
import SettingsPage from '@/pages/(app)/SettingsPage'
import BillingPage from '@/pages/(app)/BillingPage'
import ProfilePage from '@/pages/(app)/ProfilePage'
import OrgDashboardPage from '@/pages/(org)/OrgDashboardPage'
import MembersPage from '@/pages/(org)/MembersPage'
import OrgSettingsPage from '@/pages/(org)/OrgSettingsPage'
import { useAuthStore } from '@/stores/authStore'
import { useOrgStore } from '@/stores/orgStore'

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore.getState()
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

function RequireOrg({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore.getState()
  const { activeOrg } = useOrgStore.getState()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (!activeOrg) return <Navigate to="/app" replace />
  return children
}

export const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/pricing', element: <PricingPage /> },
  { path: '/forgot-password', element: <ForgotPasswordPage /> },
  {
    path: '/app',
    element: <RequireAuth>{null}</RequireAuth>,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: 'billing', element: <BillingPage /> },
      { path: 'profile', element: <ProfilePage /> },
    ],
  },
  {
    path: '/org/:orgSlug',
    element: <RequireOrg>{null}</RequireOrg>,
    children: [
      { index: true, element: <OrgDashboardPage /> },
      { path: 'members', element: <MembersPage /> },
      { path: 'settings', element: <OrgSettingsPage /> },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
])
