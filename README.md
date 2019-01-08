# Tower of Hanoi game

Built using pug, sass, typescript, and parcel.js.

This is my first venture into typescript. I figured I should start with
something small for a first time typescript project. There are some minor
annoyances, like why isn't `currentTarget` defined on the `Event` or
`MouseEvent` interface? Well that's a
[4 year old bug that isn't going to get fixed](https://github.com/Microsoft/TypeScript/issues/299)

Instead of manually managing all the logic and state updates, I tried to
replicate a basic virtual dom type solution, where I keep the state in one place
(in this case a nested array of html elements) and then "sync" that state to the
dom. It was pretty straightforward. Maybe I could implement a more robust
solution though.

Todo:

* animations on move
* sounds
* Option to select the number of discs at start (3-6)
* Add winning condition
* Add a reset