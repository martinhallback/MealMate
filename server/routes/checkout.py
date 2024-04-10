from flask import Blueprint
from flask import jsonify
from flask import request
from flask_jwt_extended import jwt_required

from bson import ObjectId

import stripe
from flask import redirect

from main import db
stripe.api_key = 'sk_test_51P3jTUJ3D9d5Vz3Fm0K2btxJFKZp5k9bH0xa6AOvvR3xXiMixVyrR8fLQUOCX0dICoSGTf1hW3Uye4yDQhIh8kCT00LfZHxjaZ'

#import relevant classes

bp = Blueprint('checkout', __name__)

@bp.route('/create-checkout-session/<int:price>/<int:quantity>', methods = ['POST'])
def checkout(price, quantity):
    if request.method == 'POST':
        try:
            checkout_session = stripe.checkout.Session.create(
            line_items=[
                {
                    # Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                    'price': price,
                    'quantity': quantity,
                },
            ],
            mode='payment',
            )
        except Exception as e:
            return str(e)


        return True, 303