"use client";

import { Rating } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

import SetColor from "./../../components/products/setColor";
import SetQuantity from "@/app/components/products/setQuantity";
import Button from "@/app/components/button";
import ProductImage from "@/app/components/products/productImage";
import { useCart } from "@/hooks/useCart";
import { MdCheckCircle } from "react-icons/md";
import { useRouter } from "next/navigation";

interface ProductDetailsProp {
  product: any;
}
export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImg: SelectedImgType;
  quantity: number;
  price: number;
};
export type SelectedImgType = {
  color: string;
  colorCode: string;
  image: string;
};
const Harizontal = () => {
  return <hr className="w-[50%] my-3" />;
};

const ProductDetails: React.FC<ProductDetailsProp> = ({ product }) => {
  const { handleAddProductToCart, cartProducts } = useCart();

  const { cartTotalQty } = useCart();
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: { ...product.images[0] },
    quantity: 1,
    price: product.price,
  });

  const router = useRouter();
  useEffect(() => {
    setIsProductInCart(false);
    if (cartProducts) {
      const existingIndex = cartProducts.findIndex(
        (item) => item.id === product.id
      );
      if (existingIndex > -1) {
        setIsProductInCart(true);
      }
    }
  }, [cartProducts]);
  const productRating =
    product.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
    product.reviews.length;
  const handleColorSelect = useCallback(
    (value: SelectedImgType) => {
      setCartProduct((prev) => {
        return { ...prev, selectedImg: value };
      });
    },
    [cartProduct.selectedImg]
  );
  const handleQtyDecrease = useCallback(() => {
    if (cartProduct.quantity === 1) {
      return;
    }
    setCartProduct((prev) => {
      return { ...prev, quantity: prev.quantity - 1 };
    });
  }, [cartProduct]);
  const handleQtyIncrease = useCallback(() => {
    if (cartProduct.quantity === 99) {
      return;
    }
    setCartProduct((prev) => {
      return { ...prev, quantity: prev.quantity + 1 };
    });
  }, [cartProduct]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <ProductImage
        cartProduct={cartProduct}
        product={product}
        handleColorSelect={handleColorSelect}
      />
      <div className="flex flex-col gap-2 text-slate-500 text-sm">
        <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
        <div className="flex gap-3 items-center">
          <Rating value={productRating} readOnly />
          <div>{product.reviews.length} reveiws</div>
        </div>
        <Harizontal />
        <div className="text-justify">{product.description}</div>
        <Harizontal />
        <div>
          <span className="font-bold">CATEGORY: </span> {product.category}
        </div>
        <div>
          <span className="font-bold">BRAND: </span> {product.brand}
        </div>
        <div>
          {product.inStock ? (
            <span className="text-green-600 font-bold">in Stock</span>
          ) : (
            <span className="text-red-700 font-bold">Out of Stock</span>
          )}
        </div>
        <Harizontal />
        {isProductInCart ? (
          <>
            <p className="mb-2 text-slate-500 flex items-center gap-1">
              <MdCheckCircle size={24} className="text-teal-500" />
              <span>Product Added To Cart</span>
            </p>
            <div className="max-w-[300px]">
              <Button
                lable="Veiw Cart"
                outline
                onClick={() => router.push("/cart")}
              />
            </div>
          </>
        ) : (
          <>
            <SetColor
              cartProduct={cartProduct}
              images={product.images}
              handleColorSelect={handleColorSelect}
            />
            <Harizontal />
            <SetQuantity
              cartProduct={cartProduct}
              handleQtyIncrease={handleQtyIncrease}
              handleQtyDecrease={handleQtyDecrease}
            />
            <Harizontal />
            <div className="max-w-[300px]">
              <Button
                lable="Add to card"
                onClick={() => handleAddProductToCart(cartProduct)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
