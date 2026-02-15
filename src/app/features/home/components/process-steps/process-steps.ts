import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { SvgIconComponent } from 'angular-svg-icon';

interface ProcessStep {
  icon: string;
  number: string;
  title: string;
}

@Component({
  selector: 'app-process-steps',
  standalone: true,
  imports: [TranslocoPipe, ButtonModule, SvgIconComponent],
  templateUrl: './process-steps.html',
  styleUrls: ['./process-steps.scss'],
})
export class ProcessSteps {
  activeTab: 'buy' | 'sell' = 'buy';

  steps: ProcessStep[] = [
    {
      icon: 'home-page1',
      number: '01',
      title: 'home.processSteps.steps.browse.title',
    },
    {
      icon: 'phone-call',
      number: '02',
      title: 'home.processSteps.steps.connect.title',
    },
    {
      icon: 'calendar',
      number: '03',
      title: 'home.processSteps.steps.schedule.title',
    },
    {
      icon: 'file-invoice',
      number: '04',
      title: 'home.processSteps.steps.secure.title',
    },
  ];

  setActiveTab(tab: 'buy' | 'sell'): void {
    this.activeTab = tab;
  }
}
