import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { DashboardOverviewData } from '@veyro/dashboard/data-access';

@Component({
  selector: 'lib-dashboard-overview',
  imports: [],
  standalone: true,
  templateUrl: './dashboard-overview.html',
  styleUrl: './dashboard-overview.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardOverview {
  readonly overview = input.required<DashboardOverviewData>();
}
