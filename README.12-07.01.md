- If possible, include screenshots and demo videos.

Your job is to

tell them what it is (with context)
show them what it looks like in action
show them how they use it
tell them any other relevant details
  







  README

included:
All source files (.cc, .hh, .cpp, .h)
this README
Makefile

Homework #5



Extra Credit:
Profiling

I used words.txt and the-new-atlantis.txt to profile my results.

In general, I expect a lot of bottlenecks to occur in the input parsing (i.e., get()'s), since we did learn that input takes a long time.

BSTrees:
For BSTrees, my expectations were that huge bottlenecks would occur in the Insert() method, and specifically, the FindNode() method called within Insert().  For atlantis, I got some pretty unexpected (but not surprising) results.  Since the data is "random" enough, I'm assuming the tree was probably somewhat balanced.  Because of this, most of the time was spent inputting and comparing strings.  Looking at my code, there are a lot of string comparisons, especially because of the HeapSort.  I should probably expect lots of comparisons in the other profiles.

Unfortunately, I was not able to profile the words.txt run.  I ran the program at around 8:30 pm, but at around 11:00 pm, it was still going, and I decided there wasn't enough time to wait for it.  However, my guess is that FindNode() took FOREVER, since the tree being created was very very VERY unbalanced.  Yech.

AVL Trees:
I got a somewhat surprising result for AVLTrees.  Out of all the methods I coded, I DID expect RecursiveInsert() to take the longest, but I did NOT expect it to take longer than input and all the other methods in the file that I cannot comprehend.  Now that I think about it, it STILL doesn't make much sense to me.  I mean, the average time it spent within itself (i.e. not including descendents) was 2.84 ms per call.  This I find surprising because RecursiveInsert() is basically a bunch of function calls.  It doesn't even have any loops!  I suppose the easy answer would be its recursive nature.  This was basically the same for words and atlantis.

Splay Trees:
Ah, good ol' Splay Trees.  I expected Splay to not have many bottlenecks, in terms of its own methods.  This was pretty much correct.  For words, most of the time was spent inputting and outputting (whatever ostream::flush() is...), which is expected since the input is large.  For atlantis, it spent the most time doing string comparisons, and also a lot of rotations, since HasParent() is high up in the rankings.  Insert's probably cost more for atlantis than for words, due to the nature of the input.  Something that really surprised me was that Splay took the longest time for the atlantis test.  I really don't have any ideas why, since I'd expect it to do really well.  Maybe if I used even larger input...


Overall, the biggest bottleneck in my program would be using BinarySearchTrees with ugly sorted input like words.txt.  The bottleneck is so huge, I didn't have enough time to profile it.  For "normal" input though, input and output are still the biggies, and there really isn't much you can do about it, unless you're an uber-hacker.



Homework 5 - readme.txt



How To Run "word-count":
     Run "word-count" using BinarySearchTree ("-b"), AVLTree ("-a"), or SplayTree ("-s"), and one
of SelectionSort ("-selectionSort"), QuickSort ("-quickSort"), Heapsort ("-heapSort").  If
no sorting algorithm is specified, we default to Heapsort.  Below is the general command:

	   ./word-count "tree" "sort" < "inputfile" > "outputfile"



Files Includes With This Project:
      AVLNode.cpp     BSTNode.cpp	       SplayTree.cpp     Pair.cpp	      Makefile       heap.ps
      AVLNode.h	      BSTNode.h		       SplayTree.h	 Pair.h		      word-count     quick.ps
      AVLTree.cpp     BinarySearchTree.cpp     Heap.cpp		 Main.cpp	      readme.txt     selection.ps
      AVLTree.h	      BinarySearchTree.h       Heap.h		 TemplateInst.cpp     



Design Decisions & Project Issues:
     We have implemented our AVLTree and SplayTree as follows: Both inherit from BinarySearchTree,
and implement the methods for canonical form, Find(), Insert(), and SingleRotate() and Splay(), for
the AVLTree and SplayTree, respecively.  These methods perform the re-balancing operations based on
the Weiss book examples.  We have implemented SingleRotate() such that the Insert() method of AVL
must decipher when to use it, and whether to perform a single or double rotation (in which case
SingleRotate() would be called twice).  Splay() is implemented to be called every time a node is
inserted or searched for (or it's parent if it is not in the tree), and is wholly responsible for
splaying that node to the root.
     Heap is implemented using Floyd's method, and we must give credit to Weiss for his examples,
which we followed.  We must also give credit to Weiss for his implementation of Quicksort, which we
followed partially.  Pair is a wrapper class which holds key and value pairs.  All sorting algorithms
and the Heap depend on Pair. 
     We must give some credit to you, the staff of CSE 326, for your example of SelectionSort, which
we followed in writing our own, and for the basic implementation of BinarySearchTree's Find() and
Insert() methods.  We copied the bodies of these methods into AVLTree and SplayTree, and added the
necessarry code to perform the re-balancing operations.



Did Shakespeare Write The Works Attributed To Him?
     Yes, he did.  The data below shows the total words used by each author, their average wpb, wpb
for each work and five most frequently used words in each work, with their respecive frequency.
Notice that these words are almost identical, a result of common english words, rather than the
writing styles of each author. My interest lies in the fact that Shakespeare has the largest
vocabulary of any author who has written in english, and that Shakespeare uses these words with far
less frequently than Bacon.  Since Bacon has a larger average wpb than Shakespreare, this means that
he uses more words on average, as the common words make up more of his works than Shakespeares.
But, he uses common words more frequently, so it would seem that he has a smaller vocabulary than
Shakespeares.
     Also, Shakespeare's results below are very regular, whereas Bacon's are not.  Based on all this,
there is not enough evidence to show that Bacon wrote the works attributed to Shakespeare.

William Shakespeare:
     total words: 14872, average wpb: 42.3482
     hamlet: 8311 words, 40.2782 wpb
	  "the"(0.1167), "and"(0.0852), "of"(0.0801), "to"(0.0760), "I"(0.0626)
     alls-well-that-ends-well: 6561 words, 44.4181 wpb
          "the"(0.1082), "I"(0.1018), "and"(0.0806), "to"(0.0759), "of"(0.0734)

Sir Francis Bacon:
    total words: 16848, average wpb: 43.4245
    the-essays: 12174 words, 38.9955 wpb
         "the"(0.2243), "of"(0.1733), "and"(0.1719), "to"(0.1232), "a"(0.0923)
    the-new-atlantis: 4674 words, 47.8534 wpb
         "of"(0.1863), "the"(0.1771), "and"(0.1739), "to"(0.0849), "that"(0.0562)	



Profiling Results:
With the different tree's we expect the the slow down to be different places in each tree.
Overall there should be some over head using strings, and all of it's methods. In the Binary
tree the biggest slow down should be in insert and find, it has to traverse
the tree in both those situations.

In the AVL tree, and the there really should be be any huge bottle neck, but a fair amout
of time will be spent insert, and SingleRotate, as any decent sized input will call
SingleRotate should be called a faiir amout of time.

In the splay tree should be similar to the AVL tree as there should be any big bottle neck
slow down. Splay may slow it a bit because, while it runs quickly once, it will be called
often as things are inserted.

Other parts of the program will take a decent amount of time will be HeapSort. It should
spend a fair amount of time in the heap class, building the heap will take some time (O(n)),
as will the sort.

Looking at the gprof output things were roughly with what we expected with a few interesting
tid-bits. The most time was spent in spent in FindNode in the Base class BinarySearchTree.
What was a little surprising that in the avl tree, the second most time consuming function was
copy from the Pair class, and for the splay tree it's the default constructor, and the Copy
Constructor for the pair class. This is probably due to us instantiated pair with strings,
and the most overhead for the entire program was for strings.

For the splay tree Insert, and splay were of the top 10 functions called the most (ignoring
calls generated by string).

For the AVL tree, Insert, and Single Rotate were near the top for function calls as well.

The biggest bottle neck for the program is the calls to FindNode. This is due to having to
search the tree (regardless of type) for the new key to be added, to check for frequency.
One way to streamline the program a bit would be to write a specialized collision function,
so that in the case where the ValueType for the function is integer the interger is
incrimented.



Algorithm Analysis Results
     The three search algorithms we implimented were selectionSort, heapSort, and quickSort.
The run time of the three are O(n^2),O(nlog n), and Amortized(n log n), all learned in class.
Looking at the plots you really can't see the nature of the sorts because of the small number
of plot points, due to the time per example constraint. The real difference can actually be
seen in the difference in the actual run times.
     While both heap sort and quick sort ran in roughly 5 seconds, 8 seconds, 11 seconds, and 17
seconds for the inputs, Selection sort took 7, 12, 17, and 31 seconds for each input. As you
can see quick sort and heap sort aren't growning very quickly, while selection sort is growing
rapidly with input size increase.

	Included are the following plots:
	     quick.ps - QuickSort graph.
	     selection.ps - SelectionSort graph.
	     heap.ps - HeapSort graph.






###### List its most useful/innovative/noteworthy features.
- Use reduce with Object destructuring and computed property names.
- Previous experience led the app to be modular to achieve scalability and performance while being less error prone.


### Methodology, approaches, and problems encountered building V.1.0




### Getting Started


### More Specific Topics (+ sample sub-categories)
- Versioning: Services, APIs, Systems
- Common Error Messages/related details
- Tests

### TODO
- Next steps
- Features planned
- Known bugs (shortlist)

#### <3 taco-tues-on-a-**fri**