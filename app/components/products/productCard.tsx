"use client";

import Image from "next/image";
import { products } from "@/utilities/products";
import { truncate } from "@/utilities/truncut";
import { formatPrice } from "@/utilities/formatPrice";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";
import Product from "@/app/Product/[productid]/page";
interface ProductCardProps {
  data: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const router = useRouter();
  const productRating =
    data.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
    data.reviews.length;
  return (
    <div
      onClick={() => {
        router.push(`/Product/${data.id}`);
      }}
      className="col-span-1 cursor-pointer border-[1.2px] border-slate-200 bg-white rounded-sm p-2 transition hover:scale-105 text-center text-sm shadow-sm"
    >
      <div className="flex flex-col items-center w-full gap-1">
        <div className="aspect-square overflow-hidden relative w-full ">
          <Image
            src={data.images.image}
            alt={data.name}
            fill
            className="w-full h-full object-contain"
          />
        </div>
        <div className="mt-4">{truncate(data.name)}</div>
        <div>
          <Rating value={productRating} />
        </div>
        <div>{data.reviews.length} reviews</div>
        <div className="font-semibold">{formatPrice(data.price)}</div>
      </div>
    </div>
  );
};

export default ProductCard;
