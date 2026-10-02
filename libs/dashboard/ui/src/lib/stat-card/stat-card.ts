import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { DashboardStatData } from '@veyro/dashboard/data-access';

@Component({
  selector: 'lib-stat-card',
  imports: [],
  standalone: true,
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatCard {
  readonly stat = input.required<DashboardStatData>();
}
