import { useAuth } from '@/hooks/useAuth'
import { useOrganization } from '@/hooks/useOrganization'
import { Avatar } from '@/components/ui/Avatar'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/Dropdown'
import { ThemeToggle } from '@/components/shared/ThemeToggle'
import { useNavigate } from 'react-router-dom'
import { mockOrgs } from '@/lib/mockData'

export function Topbar() {
  const { user, logout } = useAuth()
  const { activeOrg, switchOrg } = useOrganization()
  const navigate = useNavigate()

  return (
    <header className="h-16 border-b border-border bg-background/80 backdrop-blur-sm px-4 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="text-sm font-medium hover:opacity-80 transition-opacity">
              {activeOrg?.name ?? 'Select Organization'}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {activeOrg && (
              <>
                <DropdownMenuLabel>{activeOrg.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
              </>
            )}
            {mockOrgs.map((org) => (
              <DropdownMenuItem
                key={org.id}
                onClick={() => switchOrg(org)}
              >
                {org.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button>
              <Avatar
                src={user?.avatar_url ?? undefined}
                fallback={user?.full_name?.charAt(0) ?? 'U'}
                size="sm"
              />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{user?.email ?? ''}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/app/profile')}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/app/settings')}>
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => { logout(); navigate('/login') }}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
