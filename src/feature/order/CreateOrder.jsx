import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalPrice } from "../cart/cartSlice";
import store from "../../store";
import { useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const {
    userName,
    status: addressStatus,
    position,
    address,
    error: addressError,
  } = useSelector((state) => state.user);
  const formErrors = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const cart = useSelector(getCart);
  const dispatch = useDispatch();

  const totalCartPrice = useSelector(getTotalPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;
  const isLoadingAddress = addressStatus === "loading";

  return (
    <div className="mx-3 mt-4 max-w-[50rem]">
      <h2 className="text-lg font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST" className="mt-6 flex flex-col gap-6 p-2">
        <div className="flex flex-col sm:flex-row">
          <label className="mb-2 sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            defaultValue={userName}
            className="input grow "
            required
          />
        </div>

        <div className="flex  flex-col sm:flex-row">
          <label className="mb-2 sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" className="input w-full" required />
            {formErrors?.phone && (
              <p className="mt-2 rounded-lg bg-red-200 p-2 text-xs text-rose-600">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row">
          <label className="mb-2 sm:basis-40">Address</label>
          <div className="relative grow">
            <input
              type="text"
              name="address"
              disabled={isLoadingAddress}
              defaultValue={address}
              className="input w-full"
              required
            />
            {!position.latitude && !position.longitude && (
              <span className="absolute right-0">
                <Button
                  type="small"
                  disabled={isLoadingAddress}
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(fetchAddress());
                  }}
                >
                  get Address
                </Button>
              </span>
            )}
            {addressStatus === "error" && (
              <p className="mt-2 rounded-lg bg-red-200 p-2 text-xs text-rose-600">
                {addressError}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="3 flex h-5 w-5 accent-yellow-400"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-semibold">
            Want to yo give your order priority?
          </label>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="postion"
            value={
              position.latitude && position.longitude
                ? `${position.latitude}, ${position.longitude}`
                : ""
            }
          />
        </div>

        <div>
          <Button disabled={isSubmitting || isLoadingAddress} type="primary">
            {isSubmitting
              ? "Packing order..."
              : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "please give us your correct phone. we might need it to contact you";

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  //Don't overuse it ,cause perfomance issue
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
