import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('toggleState', [
      state(
        'open',
        style({
          transform: 'rotate(180deg)',
          color: 'red',
        }),
      ),
      state(
        'closed',
        style({
          transform: 'rotate(0deg)',
          color: 'green',
        }),
      ),
      transition('open <=> closed', animate('0.5s ease-out')),
    ]),
  ],
})
export class AppComponent {
  public isExpanded: boolean = true;
  public pageTitle: string = '';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenWidth();
  }

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event: any) => {
      if (this.getPageTitle(event.urlAfterRedirects)) {
        this.pageTitle = this.getPageTitle(event.urlAfterRedirects) as string;
        this.checkScreenWidth();
      }
    });
  }

  public checkIsMobile(): boolean {
    return window.innerWidth <= 768;
  }

  public checkScreenWidth(): void {
    if (this.isSidenavExisted()) {
      this.isExpanded = true;
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
    const urlTree = this.router.parseUrl(this.router.url);
    if (Object.keys(urlTree.queryParams).length === 0 && this.router.url !== '/') {
      return true;
    } else {
      return false;
    }
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
          return 'Отчёты';
        case 'settings':
          return 'Настройки';
        default:
          return '';
      }
    }
  }
}
