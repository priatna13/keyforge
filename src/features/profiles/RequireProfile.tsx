import { Navigate, Outlet } from 'react-router-dom'
import { useProfiles } from './ProfileContext'

export function RequireProfile() {
  const { activeProfile } = useProfiles()
  if (!activeProfile) {
    return <Navigate to="/" replace />
  }
  return <Outlet />
}
