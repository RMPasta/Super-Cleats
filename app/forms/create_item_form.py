from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed, FileRequired
from ..aws_helpers import ALLOWED_EXTENSIONS

class CreateItemForm(FlaskForm):
    name = StringField('Name')
    type = StringField('Type')
    price = IntegerField('Price')
    description = StringField('Description')
    item_img = FileField("Item Image", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    location = StringField('Location')
    team_id = IntegerField('Team Id')
