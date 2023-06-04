import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isExpanded = true;
  public isHandset!: boolean;
  public pageTitle: string = '';

  constructor(private router: Router) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event: any) => {
      if (this.getPageTitle(event.urlAfterRedirects)) {
        this.pageTitle = this.getPageTitle(event.urlAfterRedirects) as string;
      }
    });
  }

  public isSidenavOpened(): boolean {
    return this.router.url !== '/';
  }

  public getPageTitle(url: string): string {
    const route = url.substring(1, url.length);

    if (
      route === 'operations' ||
      route === 'operations/expense' ||
      route === 'operations/income' ||
      route === 'operations/moving'
    ) {
      return 'Операции';
    } else {
      switch (route) {
        case 'accounts':
          return 'Счета';
        case 'budget':
          return 'Бюджет';
        case 'income':
          return 'Доходы';
        case 'expense':
          return 'Расходы';
        case 'reports':
          return 'Отчеты';
        case 'settings':
          return 'Настройки';
        default:
          return '';
      }
    }
  }
}
