import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToasterService } from './toaster.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss']
})
export class ToasterComponent implements OnInit, OnDestroy {

  toasts: any = [];
  toastsSub: Subscription;

  constructor(private toaster: ToasterService) { }

  ngOnInit() {
    this.toastsSub = this.toaster.toast$
      .subscribe(toast => {
        this.toasts = [toast, ...this.toasts];
        setTimeout(() => this.toasts.pop(), toast.delay || 5000);
        this.toaster.subject.next(null);
      });
  }
  
  remove(index: number) {
    this.toasts = this.toasts.filter((v, i) => i !== index);
  }

  ngOnDestroy(): void {
    if (this.toastsSub) {
      this.toastsSub.unsubscribe();
    }
  }
}
