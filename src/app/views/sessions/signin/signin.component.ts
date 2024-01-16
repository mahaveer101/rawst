import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import { Validators, UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { JwtAuthService } from '../../../shared/services/auth/jwt-auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit, OnDestroy {
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;

  signinForm: UntypedFormGroup;
  errorMsg = '';
  hidePassword = true;
  locationError = '';

  constructor(
    private jwtAuth: JwtAuthService,
    private router: Router
  ) {
    this.checkUserLocationStatus();
    this.jwtAuth.getLocationStatus().subscribe((response) => {
      this.displayLocationError();
    });
  }

  ngOnInit() {
    this.signinForm = new UntypedFormGroup({
      email: new UntypedFormControl('', [Validators.required]),
      password: new UntypedFormControl('', [Validators.required, Validators.minLength(6)]),
      rememberMe: new UntypedFormControl(true)
    });
  }

  ngOnDestroy() {
  }

  signin() {
    const signinData = this.signinForm.value;
    this.submitButton.disabled = true;
    this.progressBar.mode = 'indeterminate';
    this.errorMsg = '';
    this.jwtAuth.signin(signinData.email, signinData.password)
    .subscribe({
      next: () => {
        this.router.navigateByUrl(this.jwtAuth.return);
      },
      error: ( error ) => {
        this.submitButton.disabled = false;
        this.progressBar.mode = 'determinate';
        this.errorMsg = error.message;
      }
    });
  }

  checkUserLocationStatus() {
    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      if (result.state === "denied") {
        this.displayLocationError();
      } else {
        this.locationError = '';
      }
    });
  }

  displayLocationError() {
    this.locationError = `Please allow location: `;
    if (this.isMobile()) {
      this.locationError += `Settings->Site Settings->Location`;
    } else {
      this.locationError += `Settings->Privacy and security->Site Settings->Location`;
    }
  }

  isMobile() {
    const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
  }
}
