---
title: Password Hashing for Security
layout: post
date: 2020-05-02
image: "assets/img/hash_browns.png"
---

Recently I have been working on my side project Bookli, which is web application
made with Python and Flask. As a user you can signup, login, and search for a
book (make API request through [goodreads]("https://www.goodreads.com/api")) and
also you can make comments on a book and view comments made by others.

I've completed the first two parts -- sign-up and login with a password. It
would be easy to just store the password directly in the database, but this is
poor security. It's bad security because if the database gets stolen, all
passwords are available in plain text. Many users re-use passwords across sites,
so leaking user passwords means attackers can try to use those passwords to
break into accounts on other sites.

The good news is that we know how to prevent it from happening: we only store
hashed passwords instead of plain text.

## What is a Hash?

A hash is a one-way encryption, or scrambling -- you can hash something, but not
turn the hash back into the original. This is like hashing in cooking. E.g. you
can hash up onions and potatoes into hash browns, but you can't turn hash browns
back into onions and potatoes.

There are many different hashing algorithms, such as older deprecated ones like
[MD5](https://en.wikipedia.org/wiki/MD5) and
[SHA-1](https://en.wikipedia.org/wiki/SHA-1), and more secure ones like
[SHA256](https://en.wikipedia.org/wiki/SHA-2).

These are useful for storing passwords because we don't store the password
itself, just the hash. Even if someone gets the database, they only get password
hashes and not plain text passwords. It's much safer.

What I am using for Bookli is [SHA256](https://en.wikipedia.org/wiki/SHA-2).

## So how do you check passwords?

If we only store password hashes and not plain text passwords, then how do we
confirm a user has given the correct password when they try to sign in?

What we do is re-hash the password given by the user, and see if it matches the
hash in the database. In this way we never need to store the password itself,
and only compare password hashes.

## So can we just hash our passwords and then we're done?

The answer is no. That's because a hash is always the same for a given input
string. Attackers can pre-compute them and share lists of password hashes called
[Rainbow Tables](https://en.wikipedia.org/wiki/Rainbow_table).

E.g. if you google `7cf2db5ec261a0fa27a502d3196a6f60`, you will find that it is
the md5 hash of _“pizza”_ -- people have already made this hash and shared it
online. This means if your database has a list of hashes, and some users use
common passwords, their password will still be easy to reveal as it’s a known
hash in a [Rainbow Tables](https://en.wikipedia.org/wiki/Rainbow_table)
somewhere.

## Can we solve it? Is there any other way to hash it?

Yes, we can add some unique info to each hash to keep the hashes unique. The
unique info is called a _salt_. This still works with the hash brown analogy --
you can add salt when making hash browns.

How can we make a salt? It's simple: the salt just needs to be any unique
string, and we store it alongside and inside the hash.

Example:

If the password is “pizza” (which is a terrible password, by the way), we can
generate the random unique salt as something like `"ezaoWeAp64hgmLOk"`, and then make a
sha256 hash of `"ezaoWeAp64hgmLOkpizza"` which is
a2e80ab5dac055b2421090812d7c2baceac9d573149ab290e42a2d294d61b5c7.

Now no-one can tell that this is just a hash of “pizza” -- you can confirm this
by Googling that hash to see if any existing Rainbow Tables have it. Then we
store it in the database as:

```
ezaoWeAp64hgmLOk:a2e80ab5dac055b2421090812d7c2baceac9d573149ab290e42a2d294d61b5c7
```

Notice that the salt is just stored plainly there.

Now when we want to check a given password, we redo the sha256 hash with the
salt we can see in the database, and make sure we still get the same hash again.

### Here is some of my code for sign-up and log-in.

#### Sign up

```python

def make_salt() -> str:
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(16))

def hash_password(password: str, salt: str) -> str:
    m = hashlib.sha256()
    m.update(f"{password}{salt}".encode("utf-8"))
    return m.hexdigest()

## Some parts of signup
@app.route('/post-sign-up', methods=["post"])
def post_sign_up():
    username = request.form.get("username")
    email = request.form.get("email")
    password = request.form.get("password")

    # Check for existing user with this username or email.
    existing = db.execute(
        "SELECT * FROM users WHERE username = :username OR email = :email",
        {"username": username, "email": email}).fetchone()
    if existing:
        return render_template('sign_up.html', message="Username or email already taken")

    # Hash the password with a salt for secure storage.
    salt = make_salt()
    hashed_password = hash_password(password, salt)
    password_hash_with_salt = f"{salt}:{hashed_password}"

    # Insert the new user into the DB.
    logging.info("Inserting new user")
    db.execute(
        "INSERT INTO users (username, email, password_hash) VALUES (:username, :email, :password_hash) RETURNING id",
        {
            "username": username,
            "email": email,
            "password_hash": password_hash_with_salt
        })
    db.commit()

    user_data = db.execute(
        "SELECT * FROM users WHERE username = :username",
        {"username": username}).fetchone()

    logging.info("Insert new user data: {}", user_data)

    # Log the new user in.
    session["user_data"] = user_data

    return redirect(url_for("profile"))

```

#### Log in

```python

@app.route("/login", methods=["get"])
def get_login():
    return render_template("login.html")

@app.route("/post-login", methods=["post"])
def post_login():
    username = request.form.get("username")

    user_data = db.execute(
        "SELECT * FROM users WHERE username = :username",
        {'username': username}).fetchone()

    if not user_data:
        # User not found: send back to login form.
        return render_template("login.html", message="User not found")

    submitted_password = request.form.get("password")

    # Password hash is stored in the DB like this: "salt:hash"
    stored_password = str(user_data["password_hash"]).split(":")
    stored_salt = stored_password[0]
    stored_hash = stored_password[1]

    # Make a salted hash of the submitted password.
    submitted_password_hash = hash_password(submitted_password, stored_salt)

    if stored_hash != submitted_password_hash:
        # Wrong password: send back to login.
        return render_template("login.html", message="Wrong password or Wrong username")
```

Of course, there are plenty of open source libraries that will handle this for you, and it's usually better to use those than to try and do it yourself. But this was a learning exercise for me, so it was good to go through how it works.
