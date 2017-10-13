const mongoose = require('mongoose');
const bcrypt         = require("bcrypt");
const bcryptSalt     = 10;
const User = require('../models/user');
const Organization = require('../models/organization');

mongoose.connect(process.env.MONGODB_URI, {
  	useMongoClient: true,
  });
const salt = bcrypt.genSaltSync(bcryptSalt);
const encryptedPass1 = bcrypt.hashSync("africa", salt);
const encryptedPass2 = bcrypt.hashSync('ukraine', salt);

const admin1 = new User({
	username: 'Elodie',
	password: encryptedPass1,
	email: 'elodie.wanang@gmail.com', 
	status: 'entrepreneur',
	isAdmin: true,
});

const admin2 = new User({
	username: 'Liudmila',
	password: encryptedPass2,
	email: 'liudmyla.iefremova@gmail.com', 
	status: 'entrepreneur',
	isAdmin: true,
});

const incubator1 = new Organization({
	name: "Entrepreneur Incubator",
	description: "Business Development Service. For more information - check up web site ei.co.za",
	contacts: {
		email: "ayanda@em-solutions.co.za",
		phone: "218392281",
		},
	address: {
		zip: "7925",
		country: "South Africa",
		city: "Cape Town",
		street: "Unit 6C, North Block, 31 Brickfield Road, Woodstock, Salt River",
		},
	category: 'incubator',
	status: 'accepted',
	location: { type: "Point", coordinates: [ 18.4551591, -33.9353179] }
});

const incubator2 = new Organization({
	name: "Nairobi Garage Ngong Road",
	description: "Fully serviced, coworking office space for startups, techies and entrepreneurs. For more information - check up web site https://nairobigarage.com/",
	contacts: {
		email: "ngongroad@nairobigarage.com",
		phone: "254 755 556 955",
		},
	address: {
		zip: " 00100",
		country: "Kenya",
		city: "Nairobi",
		street: "8th Floor, Pinetree Plaza, Kaburu Drive, Off Ngong Rd",
		},
	category: 'incubator',
	status: 'pending',
	location: { type: "Point", coordinates: [ 36.7908265, -1.2981487] }
});

const incubator3 = new Organization({
	name: "Nairobi Garage Westlands",
	description: "Fully serviced, coworking office space for startups, techies and entrepreneurs. For more information - check up web site https://nairobigarage.com/",
	contacts: {
		email: "westlands@nairobigarage.com",
		phone: "254 708 556 955",
		},
	address: {
		zip: " 00100",
		country: "Kenya",
		city: "Nairobi",
		street: "M2, Mirage Towers, Westlands, Chiromo Road",
		},
	category: 'incubator',
	status: 'accepted',
	location: { type: "Point", coordinates: [ 36.805311, -1.2702478] }
});

const incubator4 = new Organization({
	name: "Enspire Incubator",
	description: "A platform for facilitating the growth of viable technology businesses in Nigeria. For more information - check up web site http://enspire.org.ng/",
	contacts: {
		email: "info@enspire.org.ng",
		phone: "09 291 5340",
		},
	address: {
		zip: " 900211",
		country: "Nigeria",
		city: "Abuja",
		street: "3rd Floor, NEPZA HQ, No. 2 Zambesi Crescent, Maitama",
		},
	category: 'incubator',
	status: 'pending',
	location: { type: "Point", coordinates: [ 7.4480174, 9.0389314] }
});

const startup1 = new Organization({
	name: "Instabug",
	description: "Instabug is providing in-app feedback and bug reporting to mobile apps. It provides a seamless way for two-way communication with users, while providing detailed environment report for developers. For more information - check up web site instabug.org",
	contacts: {
		email: "info@instabug.com ",
		phone: "09 291 5340",
		},
	address: {
		zip: "12511",
		country: "Egypt",
		city: "Cairo",
		street: "63 Syria, Mit Akaba, Al Agouzah, Giza Governorate",
		},
	category: 'startup',
	status: 'accepted',
	location: { type: "Point", coordinates: [ 31.1914344, 30.0526922] }
});

const startup2 = new Organization({
	name: "Jamii Africa",
	description: "EdgePoint Digital Ltd. For more information - check up web site jamiiafrica.com",
	contacts: {
		email: "info@jamiiafrica.com ",
		phone: "255 222 664 851",
		},
	address: {
		zip: "000001",
		country: "Tanzania",
		city: "Dar es Salaam",
		street: "Plot 11 Ada Estate",
		},
	category: 'startup',
	status: 'accepted',
	location: { type: "Point", coordinates: [ 39.2655765, -6.7850744] }
});

Promise.all([admin1.save(), admin2.save()]).then(admins => {
	const [admin1, admin2] = admins
	incubator1.ownerId = admin1._id;
	incubator2.ownerId = admin2._id;
	incubator3.ownerId = admin2._id;
	incubator4.ownerId = admin2._id;
	startup1.ownerId = admin1._id;
	startup2.ownerId = admin2._id;

	Promise.all([
		incubator1.save(),
		incubator2.save(),
		incubator3.save(),
		incubator4.save(),
		startup1.save(),
		startup2.save()
	]).then(() => mongoose.connection.close())
})


