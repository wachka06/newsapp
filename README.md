# Dia & Co. Homework Note

![Image of Mainpage](https://github.com/wachka06/dia-co-homework/blob/master/src/img/diaco_screen.jpg)

### Description

This app allows the user to input a radius, a latitude, a longitude, and a budget for donations
to a sportsleague. It returns the maximum number of results within the specified radius within
the specified budget.

For calculating distance, a function from https://www.geodatasource.com/developers/javascript was borrowed. This URL contains additional documentation. However, it is important to note that east longitudes are positive (so west are negative), and south longitudes are negative (so north longitudes are positive).

Included is a JSON file with 5 sample amounts based on the information provided with the challenge. Latitudes and longitudes have been added within the near geographic proximity of Seattle, WA as sample data. The JSON data contains 5 properties: id, name, latitude, longitude, budget.

### Technologies

Project is created with:

- React version: 16.13.1
- Node.js version: v11.13.0

### Project setup

To run this project, install it locally and using npm:

```
$ cd diaandco
$ npm install
$ npm start
```
