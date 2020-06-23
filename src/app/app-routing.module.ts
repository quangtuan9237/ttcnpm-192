import { ManageOrderComponent } from './manage-order/manage-order.component';
import { OrderSucessComponent as OrderSuccessComponent } from './order-sucess/order-sucess.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { VendorAuthGuard } from './vendor-auth-guard.service';
import { ManageProductFormComponent } from './manage-product-form/manage-product-form.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { AdminAuthGuard } from './admin-auth-guard.service';
import { MyOrderComponent } from './my-order/my-order.component';
import { AuthGuard } from './auth-guard.service';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'my-order', component: MyOrderComponent, canActivate: [AuthGuard]},
  {path: 'admin/products', component: ManageProductComponent, canActivate: [AuthGuard, AdminAuthGuard]},
  {path: 'admin/products/new', component: ManageProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard]},
  {path: 'admin/products/:id', component: ManageProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard]},
  {path: 'shopping-cart', component: ShoppingCartComponent},
  {path: 'check-out', component: CheckOutComponent},
  {path: 'order-success/:id', component: OrderSuccessComponent},
  {path: 'admin/orders', component: ManageOrderComponent, canActivate: [AuthGuard, AdminAuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuard,
    AdminAuthGuard,
    VendorAuthGuard
  ],
})
export class AppRoutingModule { }
