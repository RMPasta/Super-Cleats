from app.models import db, Item, environment, SCHEMA
from sqlalchemy.sql import text
# from datetime import datetime


# Adds a demo user, you can add other users here if you want
def seed_items():
    item1 = Item(
        name='classic cleats',
        type="cleats",
        price=32,
        description='these things weigh nothing!',
        item_img='https://supercleats-pics.s3.amazonaws.com/cleats1.jpg',
        team_id=1,
        user_id='1'
    )
    item2 = Item(
        name='one of a kind socks',
        type="socks",
        price=22,
        description='they dont sell these in stores',
        item_img='https://supercleats-pics.s3.amazonaws.com/sock11.jpg',
        team_id=11,
        user_id='4'
    )
    item3 = Item(
        name='nice blue one',
        type="ball",
        price=65,
        description='50mph kick every time',
        item_img='https://supercleats-pics.s3.amazonaws.com/ball11.jpg',
        team_id=3,
        user_id='6'
    )
    item4 = Item(
        name='your average socks',
        type="socks",
        price=11,
        description='they are fine',
        item_img='https://supercleats-pics.s3.amazonaws.com/sock12.jpg',
        team_id=12,
        user_id='3'
    )
    item5 = Item(
        name='left cleats',
        type="cleats",
        price=50,
        description='buy one for you friend too!',
        item_img='https://supercleats-pics.s3.amazonaws.com/cleats2.jpg',
        team_id=2,
        user_id='2'
    )
    item6 = Item(
        name='oooooh okay',
        type="socks",
        price=27,
        description='spectacular pair of yellow socks',
        item_img='https://supercleats-pics.s3.amazonaws.com/sock13.jpg',
        team_id=13,
        user_id='4'
    )
    item7 = Item(
        name='many cleats',
        type="cleats",
        price=222,
        description='sooo many cleats',
        item_img='https://supercleats-pics.s3.amazonaws.com/cleats3.jpg',
        team_id=3,
        user_id='3'
    )
    item8 = Item(
        name='my favorite color',
        type="socks",
        price=160,
        description='these are my favorite color so its a premium price',
        item_img='https://supercleats-pics.s3.amazonaws.com/sock14.jpg',
        team_id=14,
        user_id='7'
    )
    item9 = Item(
        name='yellow ball',
        type="ball",
        price=99,
        description='this is the ball for you.',
        item_img='https://supercleats-pics.s3.amazonaws.com/ball12.jpg',
        team_id=5,
        user_id='7'
    )
    item10 = Item(
        name='hard cleats',
        type="cleats",
        price=14,
        description='very sharp',
        item_img='https://supercleats-pics.s3.amazonaws.com/cleats4.jpg',
        team_id=4,
        user_id='4'
    )
    item11 = Item(
        name='worn socks',
        type="socks",
        price=110,
        description='these were pre worn by your favorite guys',
        item_img='https://supercleats-pics.s3.amazonaws.com/sock15.jpg',
        team_id=15,
        user_id='8'
    )
    item12 = Item(
        name='purple cleats',
        type="cleats",
        price=43,
        description='you can run for days in these, no blisters',
        item_img='https://supercleats-pics.s3.amazonaws.com/cleats5.jpg',
        team_id=5,
        user_id='5'
    )
    item13 = Item(
        name='nikes finest',
        type="ball",
        price=10,
        description='really great nike ball for sale',
        item_img='https://supercleats-pics.s3.amazonaws.com/ball13.jpg',
        team_id=7,
        user_id='8'
    )
    item14 = Item(
        name='socks',
        type="socks",
        price=40,
        description='ive never heard a complaint over these',
        item_img='https://supercleats-pics.s3.amazonaws.com/sock16.jpg',
        team_id=16,
        user_id='9'
    )
    item15 = Item(
        name='blue cleats',
        type="cleats",
        price=66,
        description='great leisure cleats',
        item_img='https://supercleats-pics.s3.amazonaws.com/cleats6.jpg',
        team_id=6,
        user_id='1'
    )
    item16 = Item(
        name='spurs socks',
        type="socks",
        price=66,
        description='tottenham socks',
        item_img='https://supercleats-pics.s3.amazonaws.com/sock17.jpg',
        team_id=17,
        user_id='3'
    )
    item17 = Item(
        name='the best cleats',
        type="cleats",
        price=74,
        description='these are the best cleats and i wont take no for an answer',
        item_img='https://supercleats-pics.s3.amazonaws.com/cleats7.jpg',
        team_id=7,
        user_id='2'
    )
    item18 = Item(
        name='nice colors',
        type="balls",
        price=150,
        description='this ones a looker!',
        item_img='https://supercleats-pics.s3.amazonaws.com/ball14.jpg',
        team_id=9,
        user_id='9'
    )
    item19 = Item(
        name='solid red socks',
        type="socks",
        price=99,
        description='hard as rocks',
        item_img='https://supercleats-pics.s3.amazonaws.com/sock18.jpg',
        team_id=11,
        user_id='2'
    )
    item20 = Item(
        name='cleats here!',
        type="cleats",
        price=99,
        description='im telling you to buy these cleats!!!',
        item_img='https://supercleats-pics.s3.amazonaws.com/cleats8.jpg',
        team_id=8,
        user_id='3'
    )
    item21 = Item(
        name='running socks',
        type="socks",
        price=140,
        description='theyll practically run for you',
        item_img='https://supercleats-pics.s3.amazonaws.com/sock19.jpg',
        team_id=4,
        user_id='8'
    )
    item22 = Item(
        name='fantasy cleats',
        type="cleats",
        price=21,
        description='these are the highest quality spider man cleats ive ever sold',
        item_img='https://supercleats-pics.s3.amazonaws.com/cleats9.jpg',
        team_id=9,
        user_id='4'
    )
    item23 = Item(
        name='standing socks',
        type="socks",
        price=45,
        description='i do not recommend running in these',
        item_img='https://supercleats-pics.s3.amazonaws.com/sock20.jpg',
        team_id=8,
        user_id='1'
    )
    item24 = Item(
        name='take it or leave it',
        type="ball",
        price=34,
        description='as is',
        item_img='https://supercleats-pics.s3.amazonaws.com/ball15.jpg',
        team_id=11,
        user_id='9'
    )
    item25 = Item(
        name='chelsea socks',
        type="socks",
        price=58,
        description='prove you are a chelsea fan by putting your feet in these socks',
        item_img='https://supercleats-pics.s3.amazonaws.com/sock21.jpg',
        team_id=9,
        user_id='1'
    )
    item26 = Item(
        name='running cleats',
        type="cleats",
        price=32,
        description='run forever in these things',
        item_img='https://supercleats-pics.s3.amazonaws.com/cleats10.jpg',
        team_id=10,
        user_id='5'
    )
    item27 = Item(
        name='rainbow socks',
        type="socks",
        price=200,
        description='these things weigh nothing!',
        item_img='https://supercleats-pics.s3.amazonaws.com/sock1.jpg',
        team_id=11,
        user_id='1'
    )
    item28 = Item(
        name='good cleats',
        type="cleats",
        price=22,
        description='just a solid pair o\' cleats',
        item_img='https://supercleats-pics.s3.amazonaws.com/cleats22.jpg',
        team_id=14,
        user_id='3'
    )
    item29 = Item(
        name='4 balls',
        type="ball",
        price=240,
        description='you can not beat this deal',
        item_img='https://supercleats-pics.s3.amazonaws.com/ball16.jpg',
        team_id=13,
        user_id='1'
    )
    item30 = Item(
        name='gripping socks',
        type="socks",
        price=50,
        description='buy one for you friend too!',
        item_img='https://supercleats-pics.s3.amazonaws.com/sock2.jpg',
        team_id=12,
        user_id='2'
    )
    item31 = Item(
        name='pink cleats',
        type="cleats",
        price=22,
        description='a nice pink pair we got here for you',
        item_img='https://supercleats-pics.s3.amazonaws.com/cleats23.jpg',
        team_id=15,
        user_id='6'
    )
    item32 = Item(
        name='comfy',
        type="cleats",
        price=42,
        description='nice and snug',
        item_img='https://supercleats-pics.s3.amazonaws.com/cleats24.jpg',
        team_id=16,
        user_id='7'
    )
    item33 = Item(
        name='they call it soccer socks',
        type="socks",
        price=142,
        description='sooo light weight',
        item_img='https://supercleats-pics.s3.amazonaws.com/sock3.jpg',
        team_id=13,
        user_id='3'
    )
    item34 = Item(
        name='wow. breathtaking soccer ball',
        type="ball",
        price=22,
        description='title says it all',
        item_img='https://supercleats-pics.s3.amazonaws.com/ball17.jpg',
        team_id=15,
        user_id='3'
    )
    item35 = Item(
        name='wow cleats',
        type="cleats",
        price=66,
        description='im speachless',
        item_img='https://supercleats-pics.s3.amazonaws.com/cleats25.jpg',
        team_id=7,
        user_id='7'
    )
    item36 = Item(
        name='cool socks',
        type="socks",
        price=45,
        description='very sharp',
        item_img='https://supercleats-pics.s3.amazonaws.com/sock4.jpg',
        team_id=14,
        user_id='4'
    )
    item37 = Item(
        name='good orange gold',
        type="cleats",
        price=77,
        description='look at the gold finish on the bottom of these. you will not regret this purchase',
        item_img='https://supercleats-pics.s3.amazonaws.com/cleats26.jpg',
        team_id=15,
        user_id='6'
    )
    item38 = Item(
        name='helpful socks',
        type="socks",
        price=93,
        description='make no mistake when putting these things on',
        item_img='https://supercleats-pics.s3.amazonaws.com/sock5.jpg',
        team_id=15,
        user_id='5'
    )
    item39 = Item(
        name='cool blue',
        type="cleats",
        price=64,
        description='delightful blue colour',
        item_img='https://supercleats-pics.s3.amazonaws.com/cleats27.jpg',
        team_id=13,
        user_id='9'
    )
    item40 = Item(
        name='cool nike',
        type="ball",
        price=93,
        description='behold, the coolest nike ball',
        item_img='https://supercleats-pics.s3.amazonaws.com/ball18.jpg',
        team_id=15,
        user_id='6'
    )
    item41 = Item(
        name='blue orange mixture',
        type="cleats",
        price=33,
        description='weird mixture but its ok',
        item_img='https://supercleats-pics.s3.amazonaws.com/cleats28.jpg',
        team_id=18,
        user_id='8'
    )
    item42 = Item(
        name='yellow socks',
        type="socks",
        price=10,
        description='you can run for days in these, no blisters',
        item_img='https://supercleats-pics.s3.amazonaws.com/sock6.jpg',
        team_id=16,
        user_id='1'
    )
    item43 = Item(
        name='you would like to buy these cleats',
        type="cleats",
        price=55,
        description='you find yourself clicking the add to cart button....',
        item_img='https://supercleats-pics.s3.amazonaws.com/cleats29.jpg',
        team_id=18,
        user_id='5'
    )
    item44 = Item(
        name='yellow socks',
        type="socks",
        price=22,
        description='warm knees, yes please!',
        item_img='https://supercleats-pics.s3.amazonaws.com/sock7.jpg',
        team_id=17,
        user_id='2'
    )
    item45 = Item(
        name='say yes',
        type="cleats",
        price=99,
        description='question: can you see yourself in these cleats?',
        item_img='https://supercleats-pics.s3.amazonaws.com/cleats30.jpg',
        team_id=6,
        user_id='2'
    )
    item46 = Item(
        name='x ball',
        type="ball",
        price=49,
        description='x marks the spot to kick!',
        item_img='https://supercleats-pics.s3.amazonaws.com/ball19.jpg',
        team_id=16,
        user_id='7'
    )
    item47 = Item(
        name='clown cleats',
        type="cleats",
        price=22,
        description='these ones are for clowns. do NOT play soccer in these',
        item_img='https://supercleats-pics.s3.amazonaws.com/cleats31.jpg',
        team_id=5,
        user_id='7'
    )
    item48 = Item(
        name='short socks',
        type="socks",
        price=12,
        description='cooool ankles',
        item_img='https://supercleats-pics.s3.amazonaws.com/sock8.jpg',
        team_id=16,
        user_id='3'
    )
    item49 = Item(
        name='extremely yellow cleats',
        type="cleats",
        price=4,
        description='need these out of my home',
        item_img='https://supercleats-pics.s3.amazonaws.com/cleats32.jpg',
        team_id=10,
        user_id='4'
    )
    item50 = Item(
        name='double socks',
        type="socks",
        price=7,
        description='we stitched together two pairs of socks so you didnt have to',
        item_img='https://supercleats-pics.s3.amazonaws.com/sock9.jpg',
        team_id=15,
        user_id='4'
    )
    item51 = Item(
        name='great cleats',
        type="cleats",
        price=88,
        description='these are honestly fantastic',
        item_img='https://supercleats-pics.s3.amazonaws.com/cleats33.jpg',
        team_id=11,
        user_id='8'
    )
    item52 = Item(
        name='fantasy cleats',
        type="cleats",
        price=57,
        description='highest quality superhero cleats ive ever sold hands down',
        item_img='https://supercleats-pics.s3.amazonaws.com/cleats34.jpg',
        team_id=6,
        user_id='5'
    )
    item53 = Item(
        name='what color is this?',
        type="ball",
        price=1,
        description='one dollar if you know this color, otherwise no deal',
        item_img='https://supercleats-pics.s3.amazonaws.com/ball20.jpg',
        team_id=18,
        user_id='8'
    )
    item54 = Item(
        name='classy orange',
        type="cleats",
        price=44,
        description='great for playing soccer inside of',
        item_img='https://supercleats-pics.s3.amazonaws.com/cleats36.jpg',
        team_id=2,
        user_id='2'
    )
    item55 = Item(
        name='take these socks PLEASE',
        type="socks",
        price=2,
        description='need these gone ASAP',
        item_img='https://supercleats-pics.s3.amazonaws.com/sock10.jpg',
        team_id=14,
        user_id='5'
    )
    item56 = Item(
        name='great atheletic attire',
        type="cleats",
        price=78,
        description='you cant deny it',
        item_img='https://supercleats-pics.s3.amazonaws.com/cleats37.jpg',
        team_id=3,
        user_id='1'
    )
    item57 = Item(
        name='oldest cleats on the market i reckon',
        type="cleats",
        price=189,
        description='how do you play in these things?',
        item_img='https://supercleats-pics.s3.amazonaws.com/cleats38.jpg',
        team_id=15,
        user_id='6'
    )
    item58 = Item(
        name='classic ball',
        type="ball",
        price=87,
        description='great for kicking into the goal',
        item_img='https://supercleats-pics.s3.amazonaws.com/ball1.jpg',
        team_id=1,
        user_id='1'
    )
    item59 = Item(
        name='get it while its hot',
        type="ball",
        price=87,
        description='cmon now, get it',
        item_img='https://supercleats-pics.s3.amazonaws.com/ball21.jpg',
        team_id=17,
        user_id='2'
    )
    item60 = Item(
        name='old ball',
        type="ball",
        price=76,
        description='buy one for you friend too!',
        item_img='https://supercleats-pics.s3.amazonaws.com/ball2.jpg',
        team_id=2,
        user_id='2'
    )
    item61 = Item(
        name='world cup ball',
        type="ball",
        price=65,
        description='sooo light weight',
        item_img='https://supercleats-pics.s3.amazonaws.com/ball3.jpg',
        team_id=3,
        user_id='3'
    )
    item62 = Item(
        name='its like a sunset',
        type="ball",
        price=300,
        description='best ball on this website',
        item_img='https://supercleats-pics.s3.amazonaws.com/ball22.jpg',
        team_id=16,
        user_id='4'
    )
    item63 = Item(
        name='select ball',
        type="ball",
        price=54,
        description='this is the ball to SELECT',
        item_img='https://supercleats-pics.s3.amazonaws.com/ball4.jpg',
        team_id=4,
        user_id='4'
    )
    item64 = Item(
        name='very nice ball',
        type="ball",
        price=88,
        description='top notch ball',
        item_img='https://supercleats-pics.s3.amazonaws.com/ball5.jpg',
        team_id=5,
        user_id='5'
    )
    item65 = Item(
        name='tradition',
        type="ball",
        price=25,
        description='just like grandma used to make it',
        item_img='https://supercleats-pics.s3.amazonaws.com/ball23.jpg',
        team_id=9,
        user_id='3'
    )
    item66 = Item(
        name='adidas soccer ball',
        type="ball",
        price=2,
        description='not a bad ball at all',
        item_img='https://supercleats-pics.s3.amazonaws.com/ball6.jpg',
        team_id=14,
        user_id='5'
    )
    item67 = Item(
        name='gold ball',
        type="ball",
        price=87,
        description='this ones priceless really',
        item_img='https://supercleats-pics.s3.amazonaws.com/ball7.jpg',
        team_id=1,
        user_id='1'
    )
    item68 = Item(
        name='cool shape on this one',
        type="ball",
        price=140,
        description='point a to point b, point b being the goal',
        item_img='https://supercleats-pics.s3.amazonaws.com/ball24.jpg',
        team_id=12,
        user_id='5'
    )
    item69 = Item(
        name='stars ball',
        type="ball",
        price=76,
        description='buy three for you friends!',
        item_img='https://supercleats-pics.s3.amazonaws.com/ball8.jpg',
        team_id=2,
        user_id='2'
    )
    item70 = Item(
        name='wiggly world cup',
        type="ball",
        price=65,
        description='you will become a legend gaurenteed',
        item_img='https://supercleats-pics.s3.amazonaws.com/ball9.jpg',
        team_id=3,
        user_id='3'
    )
    item71 = Item(
        name='red ball',
        type="ball",
        price=54,
        description='super red',
        item_img='https://supercleats-pics.s3.amazonaws.com/ball10.jpg',
        team_id=4,
        user_id='4'
    )

    items = [item1, item2, item3, item4, item5, item6, item7, item8, item9, item10, item11, item12, item13, item14, item15, item16, item17, item18, item19, item20, item21, item22, item23,
            item24, item25, item26, item27, item28, item29, item30, item31, item32, item33, item34, item35, item36, item37, item38, item39, item40, item41, item42, item43, item44, item45, item46,
            item47, item48, item49, item50, item51, item52, item53, item54, item55, item56, item57, item58, item59, item60, item61, item62, item63, item64, item65, item66, item67, item68, item69,
            item70, item71]

    [db.session.add(item) for item in items]
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM items"))

    db.session.commit()
