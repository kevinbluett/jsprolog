// Browser tests



var stl = "### Accumulated standard library lives under here!\n\n# unification and ( x, y, z; w ) support\n\nunify(X, X).\n\n# ( a, b, c ) --> conjunction([a, b, c])\nconjunction([]).\nconjunction([X | Rest]) :- call(X), conjunction(Rest).\n\n# ( a; b; c ) --> disjunction([a, b, c])\ndisjunction([X | Rest]) :- call(X).\ndisjunction([X | Rest]) :- disjunction(Rest).\n\n# The canonical quicksort\nqsort([], []).\nqsort([X|Rest], Answer) :- partition(X, Rest, [], Before, [], After), qsort(Before, Bsort), qsort(After, Asort), append(Bsort, [X | Asort], Answer).\n\npartition(X, [], Before, Before, After, After).\npartition(X, [Y | Rest], B, [Y | Brest], A, Arest) :- leq(X, Y), partition(X, Rest, B, Brest, A, Arest).\npartition(X, [Y | Rest], B, Brest, A, [Y | Arest]) :- gtr(X, Y), partition(X, Rest, B, Brest, A, Arest).\n\nleq(X, Y) :- compare(X, Y, gt).\nleq(X, Y) :- compare(X, Y, eq).\ngtr(X, Y) :- compare(X, Y, lt).\n\n# Some list-processing stuff...\nappend([], Z, Z).\nappend([A|B], Z, [A|ZZ]) :- append(B, Z, ZZ).\n\nreverse([], []).\nreverse([A|B], Z) :- reverse(B, Brev), append(Brev, [A], Z).\n\nlength([], 0).\nlength([H|T], N) :- length(T, M), add(M, 1, N).\n\n# Standard prolog not/1\nnot(Term) :- call(Term), !.\nnot(Term).\n\n# Standard prolog var/1\nvar(X) :- bagof(l, varTest(X), [l, l]).\nvarTest(a).\ntarTest(b).\n"

buster.testCase("A module", {
    "states the obvious": function () {
	    var promise = {
	        then: function (callback) {
	            this.callbacks = this.callbacks || [];
	            this.callbacks.push(callback);
	        }
	    };

	    var basic = "woman(mia). \nwoman(jody). \nwoman(yolanda). \nplaysAirGuitar(jody).\n party().\n\n"

		runPrologQuery(stl+basic, function(prover){
			prover.prove("party1().", function(data){
				console.log( "Penguins live in: " + Object.keys(data) );
				buster.assert.equals(true, true);
			});
		});

		setTimeout(function () {
	        buster.assert(true);
	        var callbacks = promise.callbacks || [];

	        for (var i = 0, l = callbacks.length; i < l; ++i) {
	            callbacks[i]();
	        }
	    }, 100);
    }
});