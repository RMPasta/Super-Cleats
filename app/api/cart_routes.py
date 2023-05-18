from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Cart

cart_routes = Blueprint('cart', __name__)


@cart_routes.route('/<int:id>')
def get_cart(id):
    """
    Query for users cart
    """
    cart = Cart.query.get(id)
    return cart.to_dict()


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
    cart = Cart.query.get(cart_id)

    cart.quantity=data["quantity"]
    cart.total_price=data["total_price"]

    db.session.commit()
    return cart.to_dict()
