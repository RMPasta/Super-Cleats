from app.models import db, Ticket, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date


# Adds a demo user, you can add other users here if you want
def seed_tickets():
    ticket1 = Ticket(
        stadium='Elland Road',
        location="53.777974668690774, -1.572123144729378",
        match="Leeds United vs West Ham",
        capacity=37890,
        ticket_img='https://supercleats-pics.s3.amazonaws.com/ellandroad.jpg',
        price=100,
        event_date=date(2024, 3, 20)
    )
    ticket2 = Ticket(
        stadium='Craven Cottage',
        location="51.47506831740619, -0.2217906313671848",
        match="Fulham vs Brentford",
        capacity=25678,
        ticket_img='https://supercleats-pics.s3.amazonaws.com/cravencottage.jpg',
        price=80,
        event_date=date(2024, 6, 10)
    )
    ticket3 = Ticket(
        stadium='Falmer',
        location="50.861727599413236, -0.08372703140103196",
        match="Brighton vs Manchester United",
        capacity=30750,
        ticket_img='https://supercleats-pics.s3.amazonaws.com/falmer.jpg',
        price=200,
        event_date=date(2024, 7, 14)
    )
    ticket4 = Ticket(
        stadium='Molineux',
        location="52.59049036897542, -2.1304180736328036",
        match="Wolverhampton vs Liverpool",
        capacity=31700,
        ticket_img='https://supercleats-pics.s3.amazonaws.com/molineux.jpg',
        price=120,
        event_date=date(2024, 1, 11)
    )
    ticket5 = Ticket(
        stadium='Selhurst Park',
        location="51.398301540761835, -0.08567885835518856",
        match="Crystal Palace vs Chelsea",
        capacity=26074,
        ticket_img='https://supercleats-pics.s3.amazonaws.com/selhurst.jpg',
        price=50,
        event_date=date(2024, 2, 22)
    )
    ticket6 = Ticket(
        stadium='St. James Park',
        location="54.97599958414673, -1.6243956425133987",
        match="Newcastle United vs Arsenal",
        capacity=52338,
        ticket_img='https://supercleats-pics.s3.amazonaws.com/StJamesPark.jpg',
        price=150,
        event_date=date(2024, 12, 16)
    )
    ticket7 = Ticket(
        stadium='Villa Park',
        location="52.50928145037176, -1.8847720736373603",
        match="Aston Villa vs Manchester City",
        capacity=42660,
        ticket_img='https://supercleats-pics.s3.amazonaws.com/villa.jpg',
        price=90,
        event_date=date(2024, 3, 10)

    )
    ticket8 = Ticket(
        stadium='Goodison Park',
        location="53.43901325497202, -2.9661896159126746",
        match="Everton vs Brighton",
        capacity=39571,
        ticket_img='https://supercleats-pics.s3.amazonaws.com/goodison.jpg',
        price=99,
        event_date=date(2024, 7, 1)
    )
    ticket9 = Ticket(
        stadium='Anfield',
        location="53.43096743613273, -2.960811416366009",
        match="Liverpool vs Chelsea",
        capacity=54074,
        ticket_img='https://supercleats-pics.s3.amazonaws.com/anfield.jpg',
        price=76,
        event_date=date(2024, 7, 30)
    )
    ticket10 = Ticket(
        stadium='London',
        location="51.53876949635654, -0.016491541676943347",
        match="West Ham vs Fulham",
        capacity=62500,
        ticket_img='https://supercleats-pics.s3.amazonaws.com/londonstadium.jpg',
        price=88,
        event_date=date(2024, 4, 16)
    )
    ticket11 = Ticket(
        stadium='Etihad',
        location="53.48322651448242, -2.2003964863486827",
        match="Manchester City vs Tottenham Hotspur",
        capacity=55097,
        ticket_img='https://www.keraflo.co.uk/wp-content/uploads/2019/01/GG-Wembley-Stadium-Case-Image.jpg',
        price=220,
        event_date=date(2024, 2, 25)
    )
    ticket12 = Ticket(
        stadium='Stamford Bridge',
        location="51.481803284020536, -0.19106379089117598",
        match="Chelsea vs Leeds United",
        capacity=41798,
        ticket_img='https://supercleats-pics.s3.amazonaws.com/stamfordbridge.jpg',
        price=180,
        event_date=date(2024, 1, 7)
    )
    ticket13 = Ticket(
        stadium='Old Trafford',
        location="53.463155033024705, -2.291333791331208",
        match="Manchester United vs Fulham",
        capacity=75653,
        ticket_img='https://supercleats-pics.s3.amazonaws.com/oldtrafford.jpg',
        price=210,
        event_date=date(2024, 11, 30)
    )
    ticket14 = Ticket(
        stadium='Tottenham Hotspur',
        location="51.6043387888542, -0.06630103321228151",
        match="Tottenham Hotspur vs Arsenal",
        capacity=62062,
        ticket_img='https://supercleats-pics.s3.amazonaws.com/tottenham.jpg',
        price=170,
        event_date=date(2024, 10, 30)
    )
    ticket15 = Ticket(
        stadium='Emirates',
        location="51.5550152170489, -0.10844873136273786",
        match="Arsenal vs Newcastle United",
        capacity=60704,
        ticket_img='https://supercleats-pics.s3.amazonaws.com/emirates.jpg',
        price=150,
        event_date=date(2024, 11, 11)
    )
    ticket16 = Ticket(
        stadium='Turf Moor',
        location="53.78882965125222, -2.230369260072919",
        match="Burnley vs Aston Villa",
        capacity=21401,
        ticket_img='https://supercleats-pics.s3.amazonaws.com/turfmoor.jpg',
        price=75,
        event_date=date(2024, 9, 28)
    )
    ticket17 = Ticket(
        stadium='King Power',
        location="52.62051598016152, -1.142189502467137",
        match="Leicester vs Burnley",
        capacity=32312,
        ticket_img='https://supercleats-pics.s3.amazonaws.com/kingpower.jpg',
        price=85,
        event_date=date(2024, 9, 7)
    )

    tickets = [ticket1, ticket2, ticket3, ticket4, ticket5, ticket6, ticket7, ticket8, ticket9,
                ticket10, ticket11, ticket12, ticket13, ticket14, ticket15, ticket16, ticket17]
    [db.session.add(ticket) for ticket in tickets]
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_tickets():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tickets RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tickets"))

    db.session.commit()
