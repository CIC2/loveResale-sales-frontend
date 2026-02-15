import { Component, input, output } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { SvgIconComponent } from 'angular-svg-icon';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { UnitCard, UnitCardData } from '../unit-card/unit-card';

@Component({
  selector: 'app-units-grid',
  standalone: true,
  imports: [TranslocoPipe, SvgIconComponent, UnitCard, PaginatorModule, ProgressSpinnerModule],
  templateUrl: './units-grid.html',
  styleUrl: './units-grid.scss',
})
export class UnitsGrid {
  units = input<UnitCardData[]>([]);
  totalRecords = input(0);
  currentPage = input(0);
  pageSize = input(10);
  loading = input(false);

  pageChange = output<PaginatorState>();
  favoriteClick = output<number>();
  cardClick = output<number>();

  onPageChange(event: PaginatorState) {
    this.pageChange.emit(event);
  }

  onFavoriteClick(unitId: number) {
    this.favoriteClick.emit(unitId);
  }

  onCardClick(unitId: number) {
    this.cardClick.emit(unitId);
  }
}
