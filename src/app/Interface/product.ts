export interface Product {
    id:string,
    brand:{
        image:string,
        name:string,
        slug:string,
        _id:string
    },
    category:{
        image:string,
        name:string,
        slug:string,
        _id:string 
    },
    createdAt :string,
    description:string,
    imageCover:string,
    images:string[],
    price:number,
    quantity:number,
    ratingsAverage:number,
    ratingsQuantity:number,
    slug:string,
    sold:number,
    subcategory:{
        _id: string,
        name: string,
        slug: string,
        category: string,
    },
    title:string

}
