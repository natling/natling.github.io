const events = [
	{
		time     : new Date(2019, 5, 7, 20),
		main     : {
			name : 'William Kurtis Chang / Daniel Lawrence / elska / natalie[dot]computer',
			link : 'https://www.facebook.com/events/1265807746906064/',
		},
		location : {
			name : 'Magick City',
			link : 'http://magick.city',
		},
	},

	{
		time     : new Date(2019, 5, 9, 18),
		main     : {
			name : 'Shepherdess premieres new works by Mary Prescott, Viola Yip, and natalie[dot]computer',
			link : 'https://www.facebook.com/events/841886536144546/',
		},
		location : {
			name : 'Areté Venue and Gallery',
			link : 'https://www.aretevenue.com',
		},
	},

	{
		time     : new Date(2019, 5, 16, 20),
		main     : {
			name : 'Bodymilk Tapes NOISE PROM',
			link : 'https://www.facebook.com/events/544160135988417/',
		},
		location : {
			name : 'No Nation',
			link : 'https://www.facebook.com/NoNationUnspaceLab',
		},
	},

	{
		time     : new Date(2019, 3, 27, 22),
		main     : {
			name : 'drones and chill in natalie\'s backyard',
			link : 'https://www.facebook.com/events/426079438169596/',
		},
		location : {
			name : 'dm for address',
		},
	},

	{
		time     : new Date(2019, 4, 17, 22),
		main     : {
			name : 'drones and chill in natalie\'s backyard vol. ii',
			link : 'https://www.facebook.com/events/2241293942572840/',
		},
		location : {
			name : 'dm for address',
		},
	},

	{
		time     : new Date(2019, 4, 31, 19),
		main     : {
			name : 'Bluestockings 20th Birthday Party',
			link : 'https://www.facebook.com/events/803925943324909/',
		},
		location : {
			name : 'Bluestockings',
			link : 'http://bluestockings.com',
		},
	},

	{
		time     : new Date(2019, 7, 1, 20),
		main     : {
			name : 'drones and chill in transmitter park',
			link : 'https://www.facebook.com/events/807409526319791/',
		},
		location : {
			name : 'transmitter park',
			link : 'https://en.wikipedia.org/wiki/WNYC_Transmitter_Park',
		},
	},

	{
		time     : new Date(2019, 7, 3, 20),
		main     : {
			name : 'déjà vu?',
			link : 'https://www.facebook.com/events/1694611320672272/',
		},
		location : {
			name : 'synesthesia',
			link : 'http://synesthesia.space',
		},
	},

	{
		time     : new Date(2019, 7, 9, 20),
		main     : {
			name : 'algorave with livecode.nyc',
			link : 'https://www.facebook.com/events/346500522914959/',
		},
		location : {
			name : 'wonderville',
			link : 'https://www.wonderville.nyc',
		},
	},

	{
		time     : new Date(2019, 7, 25, 20),
		main     : {
			name : 'drones and chill in transmitter park vol. ii',
			link : 'https://www.facebook.com/events/1414148922061028/',
		},
		location : {
			name : 'transmitter park',
			link : 'https://en.wikipedia.org/wiki/WNYC_Transmitter_Park',
		},
	},

	{
		time     : new Date(2019, 7, 23, 12),
		main     : {
			name : 'NDLSS SMMR ~ 24 hour show ~ my set is 9:30 am saturday',
			link : 'https://www.facebook.com/events/2479635025421639/',
		},
		location : {
			name : 'DRTY SMMR',
			link : 'https://www.drtysmmr.com',
		},
	},

	{
		time     : new Date(2019, 8, 20, 20),
		main     : {
			name : 'Live from Area 69',
			link : 'https://www.facebook.com/events/372072943673313/',
		},
		location : {
			name : 'Babycastles',
			link : 'https://babycastles.com',
		},
	},

	{
		time     : new Date(2019, 8, 21, 20),
		main     : {
			name : 'Ambient Chaos',
			link : 'https://www.facebook.com/events/2264461233853235/',
		},
		location : {
			name : 'Spectrum',
			link : 'http://www.spectrumnyc.com',
		},
	},

	{
		time     : new Date(2019, 8, 28, 19),
		main     : {
			name : 'Samstock 2019: A Benefit Show for Sam\'s Surgery & Name Change!',
			link : 'https://www.facebook.com/events/738795109893469/',
		},
		location : {
			name : 'Babycastles',
			link : 'https://babycastles.com',
		},
	},

	{
		time     : new Date(2019, 9, 19, 22),
		main     : {
			name : 'basement gallery',
			link : 'https://www.facebook.com/events/384219179178999/',
		},
		location : {
			name : 'gymnopedie',
			link : 'https://www.gymnopedie.nyc',
		},
	},

	{
		time     : new Date(2019, 10, 8, 19),
		main     : {
			name : 'Tallulah Bankheist [CHI] // Natalie Braginsky [NYC]',
			link : 'https://www.facebook.com/events/512218192657296/',
		},
		location : {
			name : 'Frenia House',
			link : 'https://www.facebook.com/freniaCo',
		},
	},

	{
		time     : new Date(2019, 10, 16, 21),
		main     : {
			name : 'Views from Home',
			link : 'https://www.facebook.com/events/409880053297872/',
		},
		location : {
			name : 'hearth.land',
			link : 'https://hearth.land',
		},
	},

	{
		time     : new Date(2019, 11, 15, 19, 30),
		main     : {
			name : 'Messica Arson // Char Stiles // natalie[dot]computer // dog star',
			link : 'https://www.facebook.com/events/2464026473719733/',
		},
		location : {
			name : 'synesthesia',
			link : 'http://synesthesia.space',
		},
	},

	{
		time     : new Date(2019, 11, 31, 20),
		main     : {
			name : '⫷Dancy Algorave⫸ New Year\'s Eve Party',
			link : 'https://www.facebook.com/events/2452116085063130/',
		},
		location : {
			name : 'wonderville',
			link : 'https://www.wonderville.nyc',
		},
	},
];