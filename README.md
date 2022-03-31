# The Notes App Created using React.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

This is the note application challenge which is not mobile yet compatible with mobile devices but has been integrated with local storage to store the notes for you until the cache has been cleared.

### The challenge

These are the 4 main feature added to the notes application.
- Syncing the notes with the local Storage to save data even after refresh.
- Adding the notes summary titles.
- Arrange the modified notes to the top of the site.
- Add the delete icon and delete the notes once its removed.

### Screenshot

![image](https://user-images.githubusercontent.com/42742924/160988809-6d7f6fab-eed5-4394-ab85-a3a466d7dd59.png)

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

First analysed the code base provided by different react packages such as react split, showdownand Reactmde
Then add the features slowly as mentioned above to complete the challenge.

### Built with

- Semantic HTML5 markup
- CSS custom properties
- [React](https://reactjs.org/) - JS library

### What I learned

I learned a lot about how to implement this features using react the the power of react state.

The first step to sync local storage
```
  const [notes, setNotes] = React.useState(
    JSON.parse(localStorage.getItem("notesElem")) || []
  );

  // This is used to set the current note id
  const [currentNoteId, setCurrentNoteId] = React.useState(
    (notes[0] && notes[0].id) || ""
  );

  // This is used to set the current note in local storage.
  React.useEffect(() => {
    localStorage.setItem("notesElem", JSON.stringify(notes));
  }, [notes]);
```

This snippt used to change the title of the each note
```
        {/* This is used to get the snippet of the code from the notes body and set it to the sidebar */}
        <h4 className="text-snippet">{note.body.split("\n")}</h4>
```

Return a new array when a note is updated
```
  // This is used to set the current note to the top of the list.
  function updateNote(text) {
    setNotes((oldNotes) => {
      const newArray = [];
      for (let i = 0; i < oldNotes.length; i++) {
        const oldNote = oldNotes[i];
        if (oldNote.id === currentNoteId) {
          newArray.unshift({ ...oldNote, body: text });
        } else {
          newArray.push(oldNote);
        }
      }
      return newArray;
    });
  }
 ```

### Continued development

Could use styled components and other advance technologies.

### Useful resources

Scrimba and Stackoverflow/MDN Docs.

## Author

Skyz03

## Acknowledgments

Bob for free React course from Scrimba.
