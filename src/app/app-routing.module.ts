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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuard,
    AdminAuthGuard
  ],
})
export class AppRoutingModule { }
