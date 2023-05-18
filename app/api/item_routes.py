from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Item
from ..forms.create_item_form import CreateItemForm
from ..aws_helpers import upload_file_to_s3, get_unique_filename

item_routes = Blueprint('items', __name__)


@item_routes.route('/')
def items():
    """
    Query for all items and returns them in a list of item dictionaries
    """
    items = Item.query.all()
    return {'items': [item.to_dict() for item in items]}


@item_routes.route('/', methods=["POST"])
def add_item():
    """
    Add item
    """
    form = CreateItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user_id = current_user.id
        item_img=form.data['item_img']
        print("BACKEND item_img ~~~~~~~>", item_img)
        item_img.filename = get_unique_filename(item_img.filename)
        upload = upload_file_to_s3(item_img)

        if "url" not in upload:
            return {'errors': [upload]}

        item = Item(
            name=form.data['name'],
            type=form.data['type'],
            price=form.data['price'],
            description=form.data['description'],
            location=form.data['location'],
            item_img=upload["url"],
            team_id=form.data['team_id'],
            user_id=user_id,
        )
        db.session.add(item)
        db.session.commit()
        return item.to_dict()
    # Returns validation errors
    return {'errors': form.errors}, 401

@item_routes.route('/<int:item_id>', methods=["DELETE"])
def delete_item(item_id):
    """
    Delete item
    """
    item = Item.query.get(item_id)
    db.session.delete(item)
    db.session.commit()
    return {'message': "Successfully deleted"}
