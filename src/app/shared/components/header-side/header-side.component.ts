import { Component, OnInit, Input, Renderer2, OnDestroy } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { LayoutService } from '../../services/layout.service';
import { TranslateService } from '@ngx-translate/core';
import { JwtAuthService } from '../../services/auth/jwt-auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header-side',
  templateUrl: './header-side.template.html'
})
export class HeaderSideComponent implements OnInit, OnDestroy {
  @Input() notificPanel;
  currentLang = {
    name: 'EN',
    code: 'en',
    flag: 'us'
  };

  public egretThemes;
  public layoutConf: any;
  public profilePicUrl = '';
  public profilePicSub: Subscription;
  public notificationsCount = 0;
  public notificationSub: Subscription;

  constructor(
    private themeService: ThemeService,
    private layout: LayoutService,
    public translate: TranslateService,
    private renderer: Renderer2,
    public jwtAuth: JwtAuthService
  ) {

  }
  ngOnInit() {
    this.egretThemes = this.themeService.egretThemes;
    this.layoutConf = this.layout.layoutConf;
    this.translate.use(this.currentLang.code);
    this.profilePicSub = this.jwtAuth.getProfilePic().subscribe(url => {
      this.profilePicUrl = url;
    });
    this.notificationSub = this.jwtAuth.getNotifications().subscribe((response: any) => {
      this.notificationsCount = response.length;
    });
  }

  onClickNotification() {
    this.notificPanel.toggle();
  }

  toggleSidenav() {
    if (this.layoutConf.sidebarStyle === 'closed') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full'
      });
    }
    this.layout.publishLayoutChange({
      sidebarStyle: 'closed'
    });
  }

  ngOnDestroy() {
    if (this.profilePicSub) {
      this.profilePicSub.unsubscribe();
    }
    if (this.notificationSub) {
      this.notificationSub.unsubscribe();
    }
  }
}
