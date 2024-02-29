import { Button, Card } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";
import { useShoppingCart } from "../context/ShoppingCartContext";

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};
export function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    descreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  const quantity = getItemQuantity(id);
  return (
    <>
      <Card key={id} className="h-100">
        <Card.Img
          src={imgUrl}
          variant="top"
          height="200px"
          style={{ objectFit: "cover" }}
        ></Card.Img>
        <Card.Body className="d-flex flex-column">
          <Card.Title className="mb-4 d-flex justify-content-between align-items-baseline">
            <span className="fs-2">{name}</span>
            <span className="ms-2 text-muted">{formatCurrency(price)}</span>
          </Card.Title>
          <div className="mt-auto">
            {quantity === 0 ? (
              <Button
                onClick={() => increaseCartQuantity(id)}
                className="w-100"
              >
                {" "}
                + Add to Cart
              </Button>
            ) : (
              <div className="d-flex align-items-center flex-column">
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{ gap: "0.5rem" }}
                >
                  <Button onClick={() => descreaseCartQuantity(id)}>-</Button>
                  <div>
                    <span className="fs-3">{quantity} </span> in cart
                  </div>
                  <Button onClick={() => increaseCartQuantity(id)}>+</Button>
                </div>
                <Button variant="danger" onClick={() => removeFromCart(id)}>
                  Remove
                </Button>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
