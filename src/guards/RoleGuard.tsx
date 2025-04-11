import { Navigate, Outlet } from "react-router-dom"
import UserRoleEnum from "../constant/userRoleEnum"
import useAuth from "../hooks/useAuth"
import { useAppSelector } from "../store/store"
import { getProfile } from "../store/selectors/userSelector"

interface RoleGuardProps {
  allowedRoles: UserRoleEnum[]
}

const RoleGuard = ({ allowedRoles }: RoleGuardProps) => {
  const { isAuth } = useAuth()
  const user = useAppSelector(getProfile);

  if (!isAuth) {
    return <Navigate to="/login" replace />
  }

  if (!user || !allowedRoles.includes(user.userType)) {
    return <Navigate to="/unauthorized" replace />
  }

  return <Outlet />
}

export default RoleGuard
