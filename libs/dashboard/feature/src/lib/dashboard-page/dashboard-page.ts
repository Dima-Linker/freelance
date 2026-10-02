import { ChangeDetectionStrategy, Component } from '@angular/core';
import type {
  DashboardOverviewData,
  DashboardStatData,
} from '@veyro/dashboard/data-access';
import { DashboardOverview, StatCard } from '@veyro/dashboard/ui';

@Component({
  selector: 'lib-dashboard-page',
  standalone: true,
  imports: [DashboardOverview, StatCard],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage {
  readonly dashboardOverview: DashboardOverviewData = {
    workspace: 'WORKSPACE OVERVIEW / Q4 Sprint 2',
    sprint: 'Sprint 1',
    userName: 'Good morning, Dima',
    subtitle: "Here's what needs your attention today",
    status: 'Active',
  };

  readonly dashboardStats: DashboardStatData[] = [
    {
      label: 'Active Projects',
      value: 3,
      badge: '+1 this month',
      footer: {
        left: '2 in delivery',
        right: '1 under client review',
      },
    },
    {
      label: 'Pending Proposals',
      value: 5,
      badge: 'Top 5% Profile',
      footer: {
        left: 'Avg. client response',
        right: '18 hours',
      },
    },
    {
      label: 'Unread Messages',
      value: 2,
      badge: 'New Client Ping',
      footer: {
        left: 'Acme GmbH & Monolith Financial',
      },
    },
  ];
}
