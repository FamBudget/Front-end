import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, HostListener, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public isExpanded = true;
  public pageTitle: string = '';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenWidth();
  }

  constructor(private router: Router, private observer: BreakpointObserver) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event: any) => {
      if (this.getPageTitle(event.urlAfterRedirects)) {
        this.pageTitle = this.getPageTitle(event.urlAfterRedirects) as string;
      }
    });
  }

  ngAfterViewInit() {
    this.checkScreenWidth();
  }

  public checkIsMobile(): boolean {
    return window.innerWidth <= 768;
  }

  public checkScreenWidth(): void {
    if (this.isSidenavExisted()) {
      // this.isExpanded = true;
      if (this.checkIsMobile()) {
        this.sidenav.close();
        this.sidenav.mode = 'over';
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    }
  }

  public toggleSidenav(): void {
    if (this.checkIsMobile()) {
      this.sidenav.toggle();
    }
  }

  public isSidenavExisted(): boolean {
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
