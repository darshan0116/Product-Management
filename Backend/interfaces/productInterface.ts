export interface ProductInterface {
    name: string,
    price: number,
    productDesc: string,
    stock: number,
    productImg:Express.Multer.File; 
    category: string;
}