import { useQuery } from "@tanstack/react-query";
import { CartItem, ProductItem, SizeOption } from "../types/Product";
import { useState } from "react";
import { fetchProduct } from "../api/product";
import { Cart } from "./Cart";

export const ProductPage = () => {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectionError, setSelectionError] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  const { data: product, error } = useQuery<ProductItem, Error>({
    queryKey: ["productData"],
    queryFn: fetchProduct,
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });

  if (error)
    return (
      <div className="grid place-items-center h-screen w-screen absolute bg-white">
        An error occurred: {error.message}
      </div>
    );

  if (!product)
    return (
      <div className="grid place-items-center h-screen w-screen absolute bg-white">
        Loading Product...
      </div>
    );

  const addToCart = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedSize) {
      setSelectionError(true);
      return;
    }

    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (i) => i.id === product.id && i.size === selectedSize
      );

      if (existingItem) {
        return prevCart.map((i) =>
          i.id === product.id && i.size === selectedSize
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      } else {
        return [...prevCart, { ...product, size: selectedSize, quantity: 1 }];
      }
    });

    setSelectedSize("");
  };

  return (
    <>
      <Cart setCart={setCart} cart={cart} />

      <div className="flex flex-col sm:flex-row justify-center items-center sm:items-start min-h-dvh p-4 sm:p-6 w-full">
        <div className="w-full sm:w-auto mb-6 sm:mb-0">
          <img
            src={product.imageURL}
            alt={product.title}
            className="w-full max-w-96 mx-auto"
          />
        </div>

        <div className="w-full sm:max-w-lg sm:ml-24 px-4 sm:px-0">
          <h1 className="text-xl py-4">{product.title}</h1>
          <p className="price border-y border-gray-50 py-1 text-sm font-bold">
            ${product.price.toFixed(2)}
          </p>
          <p className="description font-light text-xs py-6 text-neutral-500 leading-loose">
            {product.description}
          </p>

          <form onSubmit={addToCart} className="w-full">
            <div className="mb-4">
              <label className="block text-xs mb-2 font-semibold text-neutral-400">
                SIZE <span className="text-red-400">*</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.sizeOptions.map((size: SizeOption) => (
                  <button
                    key={size.id}
                    type="button"
                    onClick={() => setSelectedSize(size.label)}
                    className={`w-10 h-10 flex items-center justify-center border text-xs text-neutral-400 ${
                      selectedSize === size.label ? "border-black border-2" : ""
                    } `}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>
            <button
              className="w-full sm:w-auto font-medium border-2 border-black py-1 px-4 active:bg-black active:text-white"
              type="submit"
            >
              ADD TO CART
            </button>
            {selectionError && (
              <p className="text-red-600 text-sm mt-2">Please select a size</p>
            )}
          </form>
        </div>
      </div>
    </>
  );
};
