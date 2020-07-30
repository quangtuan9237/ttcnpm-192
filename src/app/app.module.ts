import { ViewOrderComponent } from './view-order/view-order.component';
import { ShoppingCartService } from './shopping-cart.service';
import { ProductService } from './product.service';
import { AuthService } from './auth.service';
import { MatComponentsModule } from './mat-components/mat-components.module';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ManageProductFormComponent } from './manage-product-form/manage-product-form.component';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from './product-card/product-card.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { CartTableComponent } from './cart-table/cart-table.component';
import { OrderSucessComponent } from './order-sucess/order-sucess.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { ManageCouponComponent } from './manage-coupon/manage-coupon.component';
import { ManageCouponFormComponent } from './manage-coupon-form/manage-coupon-form.component';
import { CouponsComponent } from './coupons/coupons.component';
import { ApplyCouponComponent } from './apply-coupon/apply-coupon.component';
import { FilterProductsComponent } from './filter-products/filter-products.component';
import { ContactComponent } from './contact/contact.component';
import { FavoriteProductComponent } from './favorite-product/favorite-product.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ProductsComponent,
    NavBarComponent,
    MyOrderComponent,
    ManageProductComponent,
    ManageProductFormComponent,
    ProductCardComponent,
    ShoppingCartComponent,
    ProductQuantityComponent,
    CheckOutComponent,
    CartTableComponent,
    OrderSucessComponent,
    ManageOrderComponent,
    ManageCouponComponent,
    ManageCouponFormComponent,
    CouponsComponent,
    ApplyCouponComponent,
    ViewOrderComponent,
    FilterProductsComponent,
    ContactComponent,
    FavoriteProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatComponentsModule,
    FormsModule
  ],
  providers: [
    AuthService,
    ProductService,
    ShoppingCartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
