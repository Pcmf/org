export class Product {
  id?: string;
  _id?: string;
  name!: string;
  description!: string;
  richDescription!: string;
  image!: string;
  brand!: string;
  price!: number;
  category!: string;
  countInStock!: string;
  rating!: string;
  numReviews!: string;
  isFeatured!: boolean;
  dateCreated!: Date;
}
