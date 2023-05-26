from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Cart, Item, Ticket

cart_routes = Blueprint('cart', __name__)


@cart_routes.route('/<int:id>')
def get_cart(id):
    """
    Query for users cart
    """
    cart = Cart.query.get(id)
    if not cart:
        return {"cart": None, "items": None}
    user_cart_items = [item.to_dict() for item in cart.items]

    return {"cart": cart.to_dict(), "items": user_cart_items}


@cart_routes.route('/<int:user_id>', methods=["POST"])
def add_cart(user_id):
    """
    Create a cart for new user
    """
    cart = Cart(
        user_id=user_id
    )
    db.session.add(cart)
    db.session.commit()
    return cart.to_dict()

@cart_routes.route('/<int:cart_id>', methods=["PUT"])
def add_to_cart(cart_id):
    """
    Add item to cart
    """

    data = request.json
    item_id=data["item_id"]

    cart = Cart.query.get(cart_id)
    item = [item.to_dict() for item in cart.items if item.id == item_id]
    if not item:
        item = Item.query.get(item_id)
        cart.items.append(item)
        cart.quantity=data["quantity"]
        cart.total_price=data["total_price"]

    db.session.commit()
    return cart.to_dict()

@cart_routes.route('/<int:cart_id>/remove', methods=["PUT"])
def remove_from_cart(cart_id):
    """
    Remove item from cart
    """

    data = request.json
    item_id=data["item_id"]
    cart = Cart.query.get(cart_id)
    item = [item for item in cart.items if item.id == item_id]

    if cart and item:
        cart.quantity=data["quantity"]
        cart.total_price=data["total_price"]
        cart.items.remove(item[0])

    db.session.commit()
    return cart.to_dict()

@cart_routes.route('/<int:cart_id>/ticket', methods=["PUT"])
def add_ticket_to_cart(cart_id):
    """
    Add ticket to cart
    """

    data = request.json
    ticket_id=data["ticket_id"]

    cart = Cart.query.get(cart_id)
    ticket = [ticket.to_dict() for ticket in cart.tickets if ticket.id == ticket_id]
    if not ticket:
        ticket = Ticket.query.get(ticket_id)
        cart.tickets.append(ticket)
        cart.quantity=data["quantity"]
        cart.total_price=data["total_price"]

    db.session.commit()
    return cart.to_dict()

@cart_routes.route('/<int:cart_id>/remove/ticket', methods=["PUT"])
def remove_ticket_from_cart(cart_id):
    """
    Remove ticket from cart
    """

    data = request.json
    ticket_id=data["ticket_id"]
    cart = Cart.query.get(cart_id)
    ticket = [ticket for ticket in cart.tickets if ticket.id == ticket_id]

    if cart and ticket:
        cart.quantity=data["quantity"]
        cart.total_price=data["total_price"]
        cart.tickets.remove(ticket[0])

    db.session.commit()
    return cart.to_dict()

@cart_routes.route('/<int:cart_id>/clear', methods=["PUT"])
def clear_cart(cart_id):
    """
    Clear cart
    """

    cart = Cart.query.get(cart_id)
    items = [item for item in cart.items if cart.id == cart_id]
    for item in items:
        cart.items.remove(item)
    cart.quantity=0
    cart.total_price=0

    # if cart and item:
    #     cart.items.remove(item[0])

    db.session.commit()
    return cart.to_dict()
