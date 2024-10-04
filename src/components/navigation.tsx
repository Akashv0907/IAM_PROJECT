// src/components/navigation.tsx
'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: '/users', label: 'Users' },
    { href: '/organizations', label: 'Organizations' },
    { href: '/roles_permissions', label: 'Roles&Permissions' },
  ];

  return (
    <nav className="border-b mb-6">
      <ul className="flex space-x-6">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <li key={link.href} className={`pb-2 ${isActive ? 'border-b-2 border-black' : ''}`}>
              <Link 
                href={link.href} 
                className={isActive ? 'text-black font-medium' : 'text-gray-500 hover:text-gray-700'}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}