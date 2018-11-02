# Timebase brewery
This project is building simple Angular5 chatbot application to recommend beer to users.

When application is launched, Chatbo checks date/time/day info and asks customers specific questions.

These collected information is used to make conditions for beer recommendation.
 
( This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.0-rc.0. )

## Prerequisites
1. Npm
2. Angular Cli

## Run application
1. Download source code or clone git repository ( https://github.com/hsboykjh/timebase_brewery_chatbot.git ).
2. `$ npm install`
3. `$ ng serve`
4. Navigate to `http://localhost:4200`.

## Query conditions

### condition 1 
#### they like light coloured beers (EBC <10) in the morning and dark beers (EBC > 30) in the evening.
Defined the time and match query conditions.
1. morning(0h~12h) : ebc_lt=10;
2. afternoon(12h~18h) : No query conditions
3. evening(18h~22h) : ebc_gt=30
4. night(22h~24h) : No query conditions

### condition 2
#### they like to drink bitter beers when running tax reports (IBU > 50)
Ask a question to users and match query conditions based on the answer.
1. running tax reports : ibu_gt=50 
2. Not running tax reports : No query conditions

### condition 3 
#### they like to drink high alcohol beers (ABV > 6%) on the weekend and low alcohol beers (ABV < 4%) during the week.
1. Mon~Fri : abv_lt=4
2. Sat : abv_gt=6
3. Sun : No query conditions

## Api query string references
https://punkapi.com/documentation/v2

PARAM	TYPE	DETAILS

abv_gt	number	Returns all beers with ABV greater than the supplied number

abv_lt	number	Returns all beers with ABV less than the supplied number


ibu_gt	number	Returns all beers with IBU greater than the supplied number

ibu_lt	number	Returns all beers with IBU less than the supplied number

ebc_gt	number	Returns all beers with EBC greater than the supplied number

ebc_lt	number	Returns all beers with EBC less than the supplied number

beer_name	string	Returns all beers matching the supplied name (this will match partial strings as well so e.g punk will return Punk IPA), if you need to add spaces just add an underscore (_).

yeast	string	Returns all beers matching the supplied yeast name, this performs a fuzzy match, if you need to add spaces just add an underscore (_).

brewed_before	date	Returns all beers brewed before this date, the date format is mm-yyyy e.g 10-2011

brewed_after	date	Returns all beers brewed after this date, the date format is mm-yyyy e.g 10-2011

hops	string	Returns all beers matching the supplied hops name, this performs a fuzzy match, if you need to add spaces just add an underscore (_).

malt	string	Returns all beers matching the supplied malt name, this performs a fuzzy match, if you need to add spaces just add an underscore (_).

food	string	Returns all beers matching the supplied food string, this performs a fuzzy match, if you need to add spaces just add an underscore (_).

ids	string (id|id|...)	Returns all beers matching the supplied ID's. You can pass in multiple ID's by separating them with a | symbol.
