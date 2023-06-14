from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed, FileRequired
from ..aws_helpers import ALLOWED_EXTENSIONS

class CreateFavoriteForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    type = StringField('Type', validators=[DataRequired()])
    story = StringField('Story', validators=[DataRequired()])
    team = StringField('Team', validators=[DataRequired()])
