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
    items = Item.query.filter(Item.cart_id == cart.id)
    item_list = [item.to_dict() for item in items]
    print("BACKEND CART ITEMS TO DICT ~~~~~~~~~~~~>", item_list)
    return {"cart": cart.to_dict(), "items": item_list}


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
def edit_cart(cart_id):
    """
    Edit the content a cart for new user
    """

    data = request.json
    item_id=data["item_id"]

    cart = Cart.query.get(cart_id)
    item = Item.query.get(item_id)
    item.cart_id=cart.id
    cart.quantity=data["quantity"]
    cart.total_price=data["total_price"]

    db.session.commit()
    return cart.to_dict()
