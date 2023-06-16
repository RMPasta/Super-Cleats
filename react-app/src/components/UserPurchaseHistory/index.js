import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPurchasesThunk } from "../../store/purchase";
import { getItemsThunk } from "../../store/item";
import { getTicketsThunk } from "../../store/ticket";
import "./UserPurchaseHistory.css";

export default function UserPurchaseHistory() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const items = useSelector((state) => state.item.items);
  const tickets = useSelector((state) => state.ticket.tickets);
  const purchases = useSelector((state) => state.purchase.purchases);

  const usersPurchases = purchases?.filter((purchase) => purchase?.user_id === user?.id);

  useEffect(() => {
    dispatch(getItemsThunk())
    dispatch(getTicketsThunk())
    dispatch(getPurchasesThunk());
  }, [dispatch]);

  if (!purchases) return <h1>...Loading</h1>;
  if (!user) return <></>;
  // const usersPurchasesItemsArr = usersPurchases.map(purchase => (
  //   <div className="purchase-card">
  //       <div>{items.find(item => item.id === purchase.item_id)}</div>
  //       <div className="purchase-name">{purchase.order}</div>
  //       <div className="story scrollable-y">{purchase.price}</div>
  //   </div>
  // ))

  return (
    <div className="history-display">
        {usersPurchases.map(purchase => {
          const item = items?.find(item => item.id === purchase.item_id);
          const ticket = tickets?.find(ticket => ticket.id === purchase.ticket_id);
          return (
            <div className="purchase-card" key={purchase.id}>
                  {purchase.item_id ? (
                    <div>
                      <img src={item.item_img} className="cart-item-image" />
                      <div>{item.name}</div>
                    </div>
                  ) : <></>}
                  {purchase.ticket_id ? (
                    <div>
                      <img src={ticket.ticket_img} className="cart-item-image" />
                      <div>{ticket.match}</div>
                    </div>
                  ) : <></>}
                  <div className="story scrollable-y">{purchase.price}</div>
                  {/* <div className="purchase-name">{purchase.order}</div> */}
              </div>
          )
        })}
    </div>
  );
}
