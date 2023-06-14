# Super Cleats

### A soccer focused e-commerce web application inspired by Uber Eats.

Live site: [Super Cleats](https://super-cleats.onrender.com/)

## Technologies Used
![python](https://github.com/ExcuseMeImJack/asante/assets/107484881/6d6f71d1-4c28-4089-a3b0-e60c46e5421f)
![flask](https://github.com/ExcuseMeImJack/asante/assets/107484881/2e4d1a7e-68f3-41a0-959b-99447cd93ab3)
![postgresql](https://github.com/RMPasta/AirBnB-Clone/assets/107484881/889cbdc9-811c-408d-a075-9cd4ee9e3cbf)
![html5](https://github.com/RMPasta/AirBnB-Clone/assets/107484881/de294ad9-fa73-4183-a5de-cb2998f31f03)
![css3](https://github.com/RMPasta/AirBnB-Clone/assets/107484881/023a7ed5-f5fc-41db-8735-a00b5d47ad64)
![js](https://github.com/ExcuseMeImJack/asante/assets/107484881/0c9d211b-a02f-4dac-995a-adeb29497a45)
![react](https://github.com/RMPasta/AirBnB-Clone/assets/107484881/b24e48ca-1a01-44b8-a856-db324ec3ee46)
![redux](https://github.com/RMPasta/AirBnB-Clone/assets/107484881/a65d6db5-c45a-4dc4-84bc-7962a62beaa1)

## Landing Page
![supercleats-readme](https://github.com/RMPasta/Super-Cleats/assets/107484881/8c9efc34-108c-4fe3-b592-296db9f8287f)

## Home
![home](https://github.com/RMPasta/Super-Cleats/assets/107484881/b4466631-c279-4c3d-9f35-e8255c7af7c6)

## Profile
![user-page](https://github.com/RMPasta/Super-Cleats/assets/107484881/b69a2b9d-3515-464e-877a-2f53cda546e6)

## Cart
![filter-and-cart](https://github.com/RMPasta/Super-Cleats/assets/107484881/68304be5-87ed-48ee-bfba-8bed13e8f052)

## Getting started
1. Clone this repository (only this branch)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. Navigate to the react-app directory, install the dependencies and start the react front end

```bash
npm install
```

```bash
npm start
```
8. Open the locally hosted front end at the specified port.

### Features

Super Cleats in an Uber Eats clone for ordering soccer/football items or event tickets.

0. New account creation, log in, log out, and guest/demo login
    - Users can sign up, log in, and log out.
    - Users can use a demo log in to try the site.
    - Users can use any features without logging in except for adding items or finalizing a cart.
    - Logged in users are directed to the main page where it displays items for sale.
    - Logged out users are directed to the main page where it displays items for sale.

1. Items
    - Users can create new items
    - Users can edit item
    - Users can delete items
    - Users can view their uploaded items

2. Cart
    - Users can start a new cart
    - Users can update contents of a cart
    - Users can view items or tickets in a cart
    - Users can delete items from a cart

3. Tickets
    - Users can book tickets to a match
    - Users can track dates of matches they have tickets for
    - Users can mark matches as complete
    - Users can check map for match location

4. Favorites
    - Users can favorite items
    - Users can favorite matches(tickets)
    - Users can see their different favorited lists with their stories if submitted
    - Users can delete the favorites if they do not want them on their lists


### Built by

Ryan Malmos
- https://www.linkedin.com/in/ryan-malmos/
- rmpasta.code@gmail.com
