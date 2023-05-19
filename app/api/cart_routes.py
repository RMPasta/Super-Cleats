from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Cart, Item

cart_routes = Blueprint('cart', __name__)


@cart_routes.route('/<int:id>')
def get_cart(id):
    """
    Query for users cart
    """
    cart = Cart.query.get(id)
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
