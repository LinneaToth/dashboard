#Dashboard - WORK IN PROGRESS!

## General approach

**Modules** - Since this was bound to be more complex than anything we have built so far, with a variety of functionality and different data sources, I was set on implementing modules from the beginning. One advantage I find is that it is easier to break down the task into limited scopes. Another advantage is that it is so much easier to identify and remedy the inevitable errors and bugs, since the functionality is encapsulated.

**Classes and objects** - I have recently developed a taste for loading classes with whatever data and functionality I need for different areas. While some of the sections share some methods, I made a section class for them to inherit from.

**DRY** - The code might need another round or two in the tumbler, but I really strive to keep from repeating myself. It is oddly satisfying to reduce the code with recyclable methods and functions. However, I have discovered there is a fine line to tread. If everything is a criss-cross of dependencies and references, it compromises readability. For instance, I think the background part of my code could have been set up smarter, in that regard. Also, my DOM-building methods tend to get super chunky.

**Async** - A lot of the code is asynchronous, permitting different parts to load without bottlenecking <em>(I'm Swedish, I get a non-native speaker's pass to mistreat the English language however I please - right?)</em> the app.

## Time & Date

This module exports a simple function, that decides and sets the current time and date in existing elements.

**date.toLocaleDateString("sv-SE")** - Converter method used to format the date in a way that looks familiar to people from this part of the world.

**setTimeout** - Recursion is used to refresh the time in intervals of a second, to ensure real-time values.

## Section class

This provides a method that all of the inheriting classes can use:

**Build Element** - Takes type of element, text content, id or classes (all optional), and returns a DOM-element.

## Quick Links

## Weather

## Random Facts

## Notes

The note section is so tiny, it didn't even get a module of it's own. Instead, in main there is an event listener for the text field. On every registered input, local storage is updated with whatever the notepad says. The notes stored in local storage are inserted into the textarea upon launch of the page.

## Background
