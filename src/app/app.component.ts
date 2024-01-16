import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UILibIconService } from './shared/services/ui-lib-icon.service';
import { JwtAuthService } from './shared/services/auth/jwt-auth.service';
import { Subscription } from 'rxjs';
import { LayoutService } from './shared/services/layout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  pageTitle = '';
  public companyName = '';
  public companyNameSub: Subscription;
  public companyLogoUrl = '';
  public companyLogoSub: Subscription;
  routeSubscription: Subscription;

  constructor(
    public title: Title,
    private router: Router,
    private iconService: UILibIconService,
    private layoutService: LayoutService,
    private jwtAuth: JwtAuthService
  ) {
    iconService.init();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    this.companyLogoSub = this.jwtAuth.getCompanyLogo().subscribe(url => {
      let favIcon: HTMLLinkElement = document.querySelector('#favIcon');
      if (favIcon && url) {
        favIcon.href = url; 
      }
    });
    this.companyNameSub = this.jwtAuth.getCompanyName().subscribe(name => {
      this.title.setTitle(name)
    });
  }

  ngOnDestroy() {
    if (this.companyNameSub) {
      this.companyNameSub.unsubscribe();
    }
    if (this.companyLogoSub) {
      this.companyLogoSub.unsubscribe();
    }
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
}


