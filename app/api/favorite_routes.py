from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Favorite
from ..forms.create_favorite_form import CreateFavoriteForm
from ..forms.edit_item_form import EditItemForm
from ..aws_helpers import upload_file_to_s3, get_unique_filename

favorite_routes = Blueprint('favorites', __name__)


@favorite_routes.route('/')
def favorites():
    """
    Query for all favorites and returns them in a list of favorite dictionaries
    """
    favorites = Favorite.query.all()
    return {'favorites': [favorite.to_dict() for favorite in favorites]}


@favorite_routes.route('/', methods=["POST"])
def add_favorite():
    """
    Add favorite
    """
    form = CreateFavoriteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user_id = current_user.id
        # favorite_img=form.data['favorite_img']
        # print("BACKEND favorite_img ~~~~~~~>", favorite_img)
        # favorite_img.filename = get_unique_filename(favorite_img.filename)
        # upload = upload_file_to_s3(favorite_img)

        # if "url" not in upload:
        #     return {'errors': [upload]}
        print("FORM DATA ~~~~~~~~~~~~~~~> ", form.data)
        favorite = Favorite(
            name=form.data['name'],
            type=form.data['type'],
            story=form.data['story'],
            teams=form.data['teams'],
            user_id=user_id,
        )
        db.session.add(favorite)
        db.session.commit()
        return favorite.to_dict()
    # Returns validation errors
    return {'errors': form.errors}, 401

@favorite_routes.route('/<int:favorite_id>', methods=["PUT"])
def edit_favorite(favorite_id):
    """
    Edit favorite
    """
    form = EditFavoriteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    favorite = Favorite.query.get(favorite_id)
    if form.validate_on_submit():
        user_id = current_user.id
        if favorite.user_id != user_id:
            return "ERROR: NOT YOURS"
        if form.data["favorite_img"] != None:
            favorite_img=form.data['favorite_img']
            favorite_img.filename = get_unique_filename(favorite_img.filename)
            upload = upload_file_to_s3(favorite_img)
            favorite.favorite_img=upload["url"]
            if "url" not in upload:
                return {'errors': [upload]}

        favorite.name=form.data['name']
        favorite.type=form.data['type']
        favorite.price=form.data['price']
        favorite.description=form.data['description']
        favorite.team_id=form.data['team_id']
        favorite.user_id=user_id

        db.session.commit()
        return Favorite.to_dict()
    # Returns validation errors
    return {'errors': form.errors}, 401

@favorite_routes.route('/<int:favorite_id>', methods=["DELETE"])
def delete_favorite(favorite_id):
    """
    Delete favorite
    """
    favorite = Favorite.query.get(favorite_id)
    db.session.delete(favorite)
    db.session.commit()
    return {'message': "Successfully deleted"}
