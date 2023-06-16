from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed, FileRequired
from ..aws_helpers import ALLOWED_EXTENSIONS

class CreatePurchaseForm(FlaskForm):
    price = IntegerField('Name', validators=[DataRequired()])
    order = IntegerField('Type', validators=[DataRequired()])
    item_id = IntegerField('Item Id')
    ticket_id = IntegerField('Ticket Id')
