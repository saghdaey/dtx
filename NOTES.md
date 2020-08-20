## state management
single source of permutations (incl selected status) lives in the App component
the app component passes as the permutations as a prop to the PermutationsContainer as well as a call back function to 'select' a permutation

## improvements
Checkboxes instead of border to indiciate "selected" status; better for accessibility!
Testing
Styling -- I did *very* little on the design side
Animation -- perhaps on selection of a permutation or between pages
Change favicon so it's not set to react logo

If more data/state management needed - I would use redux (and middleware)

## some things I learned
To fetch data in a simple & quick way-- I initially used fetch() but then did some reading & it seemed that axios is better (cleaner code) and more widely supported so I refactored.
https://www.pluralsight.com/guides/axios-vs-fetch

How to use SVG's with typescript such that I could dynamically provide the "fill" prop
https://create-react-app.dev/docs/adding-images-fonts-and-files/#adding-svgs

when testing,  I learned that to view boolean value in JSX you have to call .toString()
ex. <div>selected: {selected.toString()}</div>
NOT <div>selected: {selected}</div> 
