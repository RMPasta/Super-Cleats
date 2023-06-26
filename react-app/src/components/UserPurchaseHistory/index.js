import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPurchasesThunk } from "../../store/purchase";
import { getItemsThunk } from "../../store/item";
import { getTicketsThunk } from "../../store/ticket";
import "./UserPurchaseHistory.css";

export default function UserPurchaseHistory() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const items = useSelector((state) => state.item.items);
  const teams = useSelector((state) => state.team.teams);
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

  return (
    <div className="history-display">
        {usersPurchases.length > 0 ? usersPurchases.map(purchase => {
          const item = items?.find(item => item.id === purchase.item_id);
          const ticket = tickets?.find(ticket => ticket.id === purchase.ticket_id);

          if (!ticket) return <div key={purchase.id}></div>
          return (
            <div className="purchase-card" key={purchase.id}>
                  {purchase.item_id ? (
                    <div>
                      <img src={item.item_img} className="cart-item-image" />
                      <div>{item.name}</div>
                      <div>$ {purchase.price}</div>
                    </div>
                  ) : <></>}
                  {purchase.ticket_id ? (
                    <div>
                      <img src={ticket?.ticket_img} className="cart-item-image" />
                      <div>{ticket.match}</div>
                      <div>$ {purchase.price}</div>
                    </div>
                  ) : <></>}
                  {/* <div className="purchase-name">{purchase.order}</div> */}
              </div>
          )
        }) : <h2 className="userpage-h2">Buy some things! You won't regret it.</h2>}
    </div>
  );
}
