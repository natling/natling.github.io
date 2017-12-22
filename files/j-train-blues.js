var code = `(
var intervals, pivotElement, pivotPitch, permutations, chords;

intervals = [ 2, 3, 4, 5 ];

pivotElement =  2;
pivotPitch   = 60;

permutations = intervals.size.factorial.postln.collect{
    arg i;
    intervals.permute(i);
};

chords = permutations.collect{
    arg i;
    ([0] ++ i).integrate;
}.collect{
    arg i;
    i + (pivotPitch - i[pivotElement]);
};

TempoClock.tempo = 1;

Pbind(
    \\type, \\midi,
    \\midiout, m,
    \\midinote, Pseq(chords).trace,
    \\dur, Pwhite(2, 4),
    \\legato, 1,
).play;
)`;

var about = 'J train blues is a procedurally generated piano piece composed using a program written in SuperCollider, a programming language designed for real-time audio synthesis and algorithmic composition. The procedure in this piece is simple. I chose an array of four intervals (major second, minor third, major third, and perfect fourth). Then I generated a list of all 24 possible permutations (orderings) of the interval array. Each permutation of intervals becomes a chord, and all 24 chords are transposed so the middle note of every chord is middle C. The tempo is slow and the dynamics are soft, but exact rhythm is left up to the performer.';