import { AppCoupon } from './../models/app-coupon';
import { ActivatedRoute, Router } from '@angular/router';
import { CouponService } from './../coupon.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-manage-coupon-form',
  templateUrl: './manage-coupon-form.component.html',
  styleUrls: ['./manage-coupon-form.component.scss']
})
export class ManageCouponFormComponent implements OnInit {
  coupon_id: String
  coupon = new AppCoupon()

  constructor(
    private couponService: CouponService,
    public domSanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router
  ) {

    this.coupon_id = this.route.snapshot.paramMap.get('id');
    if(this.coupon_id) this.couponService.get(this.coupon_id).pipe(take(1)).subscribe(c => this.coupon = new AppCoupon(c));
  }

  ngOnInit(): void {
  }

  save(coupon){
    if(this.coupon_id) this.couponService.update(this.coupon_id, coupon)
    else this.couponService.create(coupon);

    this.router.navigate(['../'], {relativeTo: this.route});
  }

  delete(){
    if(!confirm("Are you sure you want to delete this coupon?")) return;
    this.couponService.delete(this.coupon_id);
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
