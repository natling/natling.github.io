var aText = `why do you come here
why do you do this
why do you hate me
why do you keep calling
why do you love me
why do you need me
why do you need this
why do you want it
why do you want me
why do you want this

because i know you
because i like you
because i love you
because i want you

i hate her
i hate him
i hate it
i hate myself
i hate them
i hate this
i hate you
i hate it here
i hate my job
i hate my life
i hate this place
i hate to disappoint you
i hate to do this
i hate to leave you
i hate to see people
i hate to see you
i hate you i hate
i hate you so much

kill a child
kill a man
kill a person
kill each other
kill her husband
kill his wife
kill innocent people
kill me now
kill more people
kill my father
kill my husband
kill my wife
kill one another
kill the enemy
kill the president
kill them all

why do i care
why do i feel
why do i do it
why do i have to
why do i say that
why do i think that
why do i want to

because you love me
because you want me to

afraid of change
afraid of death
afraid of dying
afraid of everything
afraid of her
afraid of losing
afraid of people
afraid of something
afraid of this
afraid of you
afraid of being alone
afraid of each other
afraid of getting caught
afraid of losing her
afraid of the answer
afraid of the consequences
afraid of the dark
afraid of the future
afraid of the truth
afraid of the water
afraid of being left behind
afraid of making a mistake
afraid of what might happen
afraid of what will happen
afraid of what would happen

sorry for the delay
sorry for the inconvenience
sorry for the pain
sorry for what happened
sorry for your loss
sorry for both of them
sorry for the way i
sorry for what i did
sorry for what i said

i am still alive
i am still here
i am still trying
i am still in love
i am still not sure`;

var stringArray = aText.split('\n').filter(function(string) {return string != ""});

function setup() {
	createCanvas(windowWidth, windowHeight);
	noCursor();
	background('#000000');

	textFont('Menlo');
	textAlign(LEFT, TOP);
	fill('#00f72c');

	columnWidth = Math.round(textWidth(' '));
	rowHeight = 11;

	columns = Math.floor(width / columnWidth);
	rows = Math.floor(height / rowHeight);
}

function draw() {
	background(0, 5);
	text(randomItem(stringArray), random(width), random(height));
}