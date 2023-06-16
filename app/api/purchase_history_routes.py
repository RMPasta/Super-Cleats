from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, PurchaseHistory
from ..forms.create_purchase_form import CreatePurchaseForm
from ..forms.edit_item_form import EditItemForm
from ..aws_helpers import upload_file_to_s3, get_unique_filename

purchase_history_routes = Blueprint('purchase_history', __name__)


@purchase_history_routes.route('/')
def purchase_history():
    purchase_history = PurchaseHistory.query.all()
    print("purchASE HISTORYYYYYYYY", purchase_history)
    return {'purchase_history': [purchase.to_dict() for purchase in purchase_history]}


@purchase_history_routes.route('/', methods=["POST"])
def add_purchase_history():
    """
    Add purchase_history
    """
    form = CreatePurchaseForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user_id = current_user.id

        purchase = PurchaseHistory(
            price=form.data['price'],
            order=form.data['order'],
            item_id=form.data['item_id'],
            ticket_id=form.data['ticket_id'],
            user_id=user_id,
        )
        db.session.add(purchase)
        db.session.commit()
        return purchase.to_dict()
    # Returns validation errors
    return {'errors': form.errors}, 401

# @item_routes.route('/<int:item_id>', methods=["PUT"])
# def edit_item(item_id):
#     """
#     Edit item
#     """
#     form = EditItemForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     item = Item.query.get(item_id)
#     if form.validate_on_submit():
#         user_id = current_user.id
#         if item.user_id != user_id:
#             return "ERROR: NOT YOURS"
#         if form.data["item_img"] != None:
#             item_img=form.data['item_img']
#             item_img.filename = get_unique_filename(item_img.filename)
#             upload = upload_file_to_s3(item_img)
#             item.item_img=upload["url"]
#             if "url" not in upload:
#                 return {'errors': [upload]}

#         item.name=form.data['name']
#         item.type=form.data['type']
#         item.price=form.data['price']
#         item.description=form.data['description']
#         item.team_id=form.data['team_id']
#         item.user_id=user_id

#         db.session.commit()
#         return item.to_dict()
#     # Returns validation errors
#     return {'errors': form.errors}, 401

# @item_routes.route('/<int:item_id>', methods=["DELETE"])
# def delete_item(item_id):
#     """
#     Delete item
#     """
#     item = Item.query.get(item_id)
#     db.session.delete(item)
#     db.session.commit()
#     return {'message': "Successfully deleted"}
