This app is made of django-rest-framework and react.
For authentication, it uses djangorestframework-simple-jwt.
There are two types of users(staffs and ordinary users).
They are all managed by admin.
And admin/staff can manage users and admin can manage staffs.
i.e Admin can create staff or user and staff can create only user.(CRUD)

And all kinds of users can manage the products and categories.

How to run this application?
git clone (this repository)
For Backend
1, cd backend
2, pipenv install -r requirements.txt
3, python manage.py migrate
4, python manage.py runserver

You can see the backend is running in http://localhost:8000
For Frontend
1, cd frontend
2, npm install
3, npm start
You can see the frontend is running in http://localhost:3000

You can login using the following credentials
For admin
email: admin@gmail.com
password: password

For staff
email: chao@gmail.com
password: password
Once you signup with your credentials, you can log in and see the products and category.
You can create/read/update/delete products and create new category.


