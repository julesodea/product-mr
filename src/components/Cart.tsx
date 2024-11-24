import { useState } from "react";
import { CartItem } from "../types/Product";

export const Cart = ({ cart, setCart }: { cart: CartItem[]; setCart: any }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const updateQuantity = (id: number, size: string, change: number) => {
    setCart(
      cart
        .map((i) =>
          i.id === id && i.size === size
            ? { ...i, quantity: Math.max(0, i.quantity + change) }
            : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const groupedCart = cart.reduce((acc, item) => {
    const key = `${item.id}-${item.size}`;
    if (!acc[key]) {
      acc[key] = { ...item };
    } else {
      acc[key].quantity += item.quantity;
    }
    return acc;
  }, {} as Record<string, CartItem>);

  return (
    <>
      <section className="w-full bg-neutral-100 flex justify-end mt-3">
        <button
          onClick={() => setIsCartOpen(!isCartOpen)}
          aria-expanded={isCartOpen}
          className="px-4 sm:pr-36 py-2 text-xs text-neutral-400"
        >
          My Cart (
          {Object.values(groupedCart).reduce(
            (acc, item) => acc + item.quantity,
            0
          )}
          )
        </button>
      </section>

      {isCartOpen && (
        <div className="absolute w-full flex justify-end z-50">
          <aside className="border border-gray-200 bg-white shadow-lg rounded-md p-4 w-full mx-4 sm:mx-0 sm:w-auto sm:min-w-[320px] sm:mr-36">
            {Object.values(groupedCart).length > 0 ? (
              <ul className="space-y-4">
                {Object.values(groupedCart).map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-4">
                    <img
                      src={item.imageURL}
                      alt={`${item.title}-${item.size}`}
                      height={70}
                      width={80}
                      className="object-cover"
                    />
                    <li className="border-b border-gray-100 pb-4 flex-1">
                      <h3 className="font-medium py-2 text-sm">{item.title}</h3>
                      <p className="text-gray-600 text-sm py-1">
                        {item.quantity}x{" "}
                        <span className="font-bold text-xs text-neutral-900">
                          ${item.price.toFixed(2)}
                        </span>
                      </p>
                      <p className="text-xs py-1">Size: {item.size}</p>

                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.size, -1)}
                          aria-label={`Decrease quantity of ${item.title} size ${item.size}`}
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50"
                        >
                          -
                        </button>
                        <button
                          onClick={() => updateQuantity(item.id, item.size, 1)}
                          aria-label={`Increase quantity of ${item.title} size ${item.size}`}
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50"
                        >
                          +
                        </button>
                      </div>
                    </li>
                  </div>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">Your cart is empty</p>
            )}
          </aside>
        </div>
      )}
    </>
  );
};
