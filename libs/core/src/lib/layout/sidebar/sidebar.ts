import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface NavItem {
  label: string;
  route: string;
  icon?: string;
  badge?: number;
}

@Component({
  selector: 'lib-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar {
  readonly navItems: NavItem[] = [
    { label: 'Dashboard', route: '/dashboard' },
    { label: 'Find Jobs', route: '/jobs' },
    { label: 'Proposals', route: '/proposals' },
    { label: 'Contracts', route: '/contracts' },
    { label: 'Messages', route: '/messages' },
  ];
}
