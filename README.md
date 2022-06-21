<div align=center>
    <h1 align=center>
        <br>
        Fingermark assessment 
        <br>
    </h1>
    <p style="font-size: 1.35rem; font-weight: 500; padding: 2rem; text-align: center"> This is my solution for the items proposed <a href="https://fingermark.notion.site/Kiosk-Management-Technical-Test-Front-end-4fb08f5444104aef815b732802947bf0" target="_blank">here</a> </p>
    <br>
</div>

## Setup

### Requirements

- Node Package Manager (NPM)

### Steps to run this project locally

- Clone the [repository]('https://github.com/adriansdk/simpleshow.git')
- Install dependencies using: `npm install`
- Run the app in development mode using: `npm start`
- The app should automatically open at `http://localhost:4200/`!
- Input any name and email to create your user and login.

# Decision making and considerations.

### Choice of tools:

This project was proposed to be built with React, with a monorepo structure and utilizing a mocked API. For my build system and monorepo support, I decided to go with NX, since I had a little bit of experience with it, and I knew it had bootstrap options for initializing projects with React and Typescript. I used [mockapi.io](mockapi.io) for my backend, since it is super easy to get up and running and would be able to provide all of the routes required for this project out of the box. I assumed styling was not the focus of this project since no design requirement was provided, and since I didn't need to heavily customize my components, I decided to use [Semantic UI](https://react.semantic-ui.com/) for my styling needs. <br>

### Things I would improve or add

- Code readability and separation, did not spend a ton of time organizing my file structure, some things such as Interfaces might be out of place.
- Semantic UI is fine for this use case, but I would have loved to use Tailwind instead and have more control of my components styles.
- If I had more time to work on this project, I would implement form validation, little to no time was spent on that .

### Total time spent on project

9-10 hours.

# Developer:

- [Adrian Visnieski](https://github.com/adriansdk)
