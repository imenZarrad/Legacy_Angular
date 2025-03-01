import { Component, OnInit } from '@angular/core';
import { CartsService } from '../services/carts.service';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cart:any={user:{},products:[]}
  total:number=0
  order:any={userId:"test",products:[]}       
  constructor(private cartService:CartsService,
              private router:Router,
              private userService:UsersService) {
    this.del=this.del.bind(this)
    this.ngOnInit=this.ngOnInit.bind(this)
   }


  ngOnInit(): void {
        // @ts-ignore
    this.userService.login(JSON.parse(localStorage.getItem('loged'))).subscribe(
      (data:any)=>{
        this.cart.user={userId:data.id}
                // @ts-ignore
        if(JSON.parse(localStorage.getItem('cart'))){
          // @ts-ignore
                  this.cart.products=JSON.parse(localStorage.getItem('cart')).products
                  this.total=this.cart.products.reduce((acc:number,e:any)=>{return acc+(e.price*e.quantity)},0)
                  
                }
        }
        
    )
  }
  del(id:string):void{
   this.cart.products=this.cart.products.filter((element:any)=>{return element.id!==id})
   
   localStorage.setItem('cart',JSON.stringify({products:this.cart.products}))
   this.ngOnInit()
  }
  clearCart(){
    localStorage.removeItem('cart')
    location.reload()
  }
  postCart(){
    this.order.products=this.cart.products.map((e:any)=>{return {productId:e.id,quantity:e.quantity}})
    this.cartService.addCart(this.order).subscribe(()=>{
      console.log("cart saved");
    })
  }
}
