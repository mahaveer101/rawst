import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import { NavigationService } from "../../../shared/services/navigation.service";
import { ThemeService } from "../../services/theme.service";
import { Subscription } from "rxjs";
import { ILayoutConf, LayoutService } from "app/shared/services/layout.service";
import { JwtAuthService } from "app/shared/services/auth/jwt-auth.service";

@Component({
  selector: "app-sidebar-side",
  templateUrl: "./sidebar-side.component.html"
})
export class SidebarSideComponent implements OnInit, OnDestroy {
  public menuItems: any[];
  public hasIconTypeMenuItem: boolean;
  public iconTypeMenuTitle: string;
  private menuItemsSub: Subscription;
  public layoutConf: ILayoutConf;
  public role: any;
  public childCount: any;
  public profilePicUrl = '';
  public profilePicSub: Subscription;
  public companyLogoUrl = '';
  public companyLogoSub: Subscription;
  public companyName = '';
  public companyNameSub: Subscription;

  constructor(
    private navService: NavigationService,
    public themeService: ThemeService,
    private layout: LayoutService,
    public jwtAuth: JwtAuthService
  ) {}

  ngOnInit() {
    this.iconTypeMenuTitle = this.navService.iconTypeMenuTitle;
    const user: any = this.jwtAuth?.user;
    this.role = user?.role_id;
    this.childCount = user?.child_count || '0';
    this.menuItemsSub = this.navService.menuItems$.subscribe(menuItem => {
      this.menuItems = menuItem;
      //Checks item list has any icon type.
      this.hasIconTypeMenuItem = !!this.menuItems.filter(
        item => item.type === "icon"
      ).length;
    });
    this.layoutConf = this.layout.layoutConf;

    this.profilePicSub = this.jwtAuth.getProfilePic().subscribe(url => {
      this.profilePicUrl = url;
    });
    this.companyLogoSub = this.jwtAuth.getCompanyLogo().subscribe(url => {
      this.companyLogoUrl = url;
    });
    this.companyNameSub = this.jwtAuth.getCompanyName().subscribe(name => {
      this.companyName = name;
    });
  }
  
  ngOnDestroy() {
    if (this.menuItemsSub) {
      this.menuItemsSub.unsubscribe();
    }
    if (this.profilePicSub) {
      this.profilePicSub.unsubscribe();
    }
    if (this.companyLogoSub) {
      this.companyLogoSub.unsubscribe();
    }
    if (this.companyNameSub) {
      this.companyNameSub.unsubscribe();
    }
  }
  
  toggleCollapse() {
    if (
      this.layoutConf.sidebarCompactToggle
    ) {
        this.layout.publishLayoutChange({
        sidebarCompactToggle: false
      });
    } else {
        this.layout.publishLayoutChange({
            // sidebarStyle: "compact",
            sidebarCompactToggle: true
          });
    }
  }
}
