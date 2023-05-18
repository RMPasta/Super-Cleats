from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed, FileRequired
from ..aws_helpers import ALLOWED_EXTENSIONS

class EditItemForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    type = StringField('Type', validators=[DataRequired()])
    price = IntegerField('Price', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    item_img = FileField("Item Image", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    location = StringField('Location')
    team_id = IntegerField('Team Id', validators=[DataRequired()])
