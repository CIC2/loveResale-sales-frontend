import { NgTemplateOutlet } from '@angular/common';
import { Component, contentChild, TemplateRef } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-empty-state',
  imports: [SvgIconComponent, NgTemplateOutlet],
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss'],
})
export class EmptyStateComponent {
  customContent = contentChild(TemplateRef);
}
