from flask import Blueprint
from flask import jsonify
from flask import request
from flask_jwt_extended import jwt_required

import configuration

from bson import ObjectId

import stripe
from flask import redirect

from main import db
stripe.api_key = 'sk_test_51P3jTUJ3D9d5Vz3Fm0K2btxJFKZp5k9bH0xa6AOvvR3xXiMixVyrR8fLQUOCX0dICoSGTf1hW3Uye4yDQhIh8kCT00LfZHxjaZ'

#import relevant classes
domain = 'http://localhost:' + str(configuration.portNumber)

bp = Blueprint('checkout', __name__)
@bp.route('/create-checkout-session', methods = ['POST'])
def checkout():
    if request.method == 'POST':
        data = request.get_json()
        try:
            price = str(data['price'])
            name = "test"
            quantity = data['quantity']
            checkout_session = stripe.checkout.Session.create(
            line_items=[
                {
                    'price_data': {
                        'currency' : 'sek',
                        'unit_amount': price * 100,
                        'product_data':{
                            'name': name
                        }
                    },
                    'quantity': quantity,
                },
            ],
            mode='payment',
            success_url= domain + '/success.html',
            cancel_url= domain + '/cancel.html'
            )
            return jsonify({'url': checkout_session.url})
        
        except Exception as e:
            return jsonify({'error': str(e)}), 500

        #return redirect(checkout_session.url, code=303)
        #return True, 303