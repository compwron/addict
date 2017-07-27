# Addict

> Get a full Active Directory REST API in 30 seconds

---

Addict is a drop-in REST API microservice for Active Directory and LDAP implementations. Just like that.

Doing this:

```bash
npm i addict-api -g 
addict --url ldaps://[address] --user [user]@[domain] --pass [pass]
```

Gives you a web server with REST endpoints to add, remove, move, disable, enable, unlock or list Users, Groups and Organizational Units. It includes result caching by default and flexible filters for querying, sorting, pagination and column selection.

There's interactive API docs at `/api`:

<p align="center"><img src="https://raw.githubusercontent.com/thoughtbrew/img/master/addict-api.png" width=700 alt="Screenshot of API docs for Addict."></p>

<p align="center"><em>No, it's not Slate.</em></p>

These docs let you add arguments, try the requests and see the results.

Made with <3 by [dthree](https://github.com/dthree).

## API

```js
# Users

GET /user
POST /user
GET /user/:user
GET /user/:user/exists
GET /user/:user/member-of/:group
POST /user/:user/authenticate
PUT /user/:user/password
PUT /user/:user/password-never-expires
PUT /user/:user/password-expires
PUT /user/:user/enable
PUT /user/:user/disable
PUT /user/:user/move
PUT /user/:user/unlock
DELET /user/:user

# Groups

GET /group
POST /group
GET /group/:group
GET /group/:group/exists
POST /group/:group/user/:user
DELETE /group/:group/user/:user
DELETE /group/:group

# Organizational Units

GET /ou
POST /ou
GET /ou/:ou
GET /ou/:ou/exists
DELETE /ou/:ou

# Other

GET /other
GET /all
GET /find/:filter
GET /status

# Monitoring

GET /status 						

```

Want more? [Just ask](https://github.com/dthree/addict/wiki/Roadmap).

### Filters

#### Fields

Choose which fields to include in the results:

`GET /user?_fields=description,cn`

#### Filter

Filter any field with `fieldName=value`.

`GET /group?cn=Guests`

We've got operators as well:

`GET /user?userAccountControl_gte=500`

##### Operators

 - `=`: Equals
 - `_ne=`: Not equals 
 - `_lt=`: Less than
 - `_gt=`: Greater than
 - `_gte=`: Greater than or equal to
 - `_lte=`: Less than or equal to
 - `_like=`: Like (fuzzy search)

#### Sort

`GET /ou?_sort=whenCreated,dn&_order=desc,asc`

#### Paginate

`GET /user?_page=6&limit=10`

#### Slice

Add `_start` and `_end` or `_limit`:

`GET /user?_start=20&_limit=40`

#### Full Text Search

`GET /group?_q=addict`



## The Nitty Gritty

#### Passing Secrets

You can pass the AD details at runtime:

```bash
addict --url ldaps://[address] --user [user]@[domain] --pass [pass]
```

As environmental variables:

```bash
export ADDICT_URL=ldaps://[address]
export ADDICT_USER=[user]@[domain]
export ADDICT_PASS=[pass]
```

Or in `./config.json`:


```bash
git clone https://github.com/dthree/addict.git
cd addict
vim ./config.json
```

```json
{
  ...
  "user": "[user]@[domain]",
  "pass": "[pass]",
  "url": "ldaps://[address]"
}
```

#### Authentication

This service defaults to no authentication. I can't and won't try to guess your flavor. 

Addict uses `express`. The file `./middleware.js` at the root of the directory exposes the app so you can add middleware hooks for auth logic.

#### LDAP vs LDAPS

If you connect to Active Directory over plain LDAP, it will refuse certain write operations including adding a user and changing a password. To make things even better, Windows Server doesn't support LDAPS out of the box. You're going to have to set up the Domain Controller as a cert authority by installing the `Active Directory Certificate Services` Role.

[Here's a good tutorial on that.](http://gregtechnobabble.blogspot.com/2012/11/enabling-ldap-ssl-in-windows-2012-part-1.html)


## License

MIT

