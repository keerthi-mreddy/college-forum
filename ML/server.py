from flask import Flask, render_template, request, redirect, flash
import requests
from flask_wtf import FlaskForm
from wtforms import FileField, SubmitField
from werkzeug.utils import secure_filename
import os
from wtforms.validators import InputRequired
import imghdr
from main import check

app = Flask(__name__)
app.config['SECRET_KEY'] = 'supersecretkey'
app.config['UPLOAD_FOLDER'] = 'static/files'


class UploadFileForm(FlaskForm):
    file = FileField("File", validators=[InputRequired()])
    submit = SubmitField("Upload File")


@app.route('/', methods=['GET', 'POST'])
def home():
    roll_number = request.args.get('rollNumber')
    role = request.args.get('role')
    print(roll_number, type)
    form = UploadFileForm()
    if form.validate_on_submit():
        file = form.file.data  # First grab the file
        file.save(os.path.join(os.path.abspath(os.path.dirname(__file__)),
                               app.config['UPLOAD_FOLDER'], secure_filename(file.filename)))  # Then save the file
        if(check(roll_number) == True):
            flash("you are successfully logged in")
            json_obj = {'roll_number': roll_number}
            if(role == 'user'):
                res = requests.post('http://localhost:5000/users/verified/',
                          json=json_obj)
            else:
                res = requests.post('http://localhost:5000/faculty/verified/',
                          json=json_obj)
            if(res.status_code == 200):
                return redirect('http://localhost:3000/')
    return render_template('home.html', form=form, roll_number=roll_number)


app.run(port=8080)
