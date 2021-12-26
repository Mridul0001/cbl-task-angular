import { of } from "rxjs";
import { PRODUCTS_MOCK } from "../mockdata/products.mock"

export class CommonServiceMock{
    getProducts = () => {return PRODUCTS_MOCK};
    placeOrder = (body:any) => {return of({orderId:1})};
}