# NodeJS Firebase Backend

I wanted to find out how a NodeJS server could be hosted on firebase for next-to-nothing in terms of costing. I also wanted to see just how easy it would be to setup a backend server and deploy it to firebase.

## Git repo cloning

Once you've cloned the repository, you want to run:

```bash
npm install
```

After you've installed all dependencies, you want to update the *.firebaserc* file and add your project under: 

```JSON
{
    "projects": {
        "default": "your-project-here"
    }
}
```

> This should point to a project you've created in the Firebase console.

After you've completed the configuration, you want to ensure that you are pointing to the correct resources for your database reference. Make sure to change the following in the `functions/src/index.ts` file:

```TS
// Add your database reference here.
// Make sure that it is situated within the project you specified in the previous step.
const databaseReference = firebaseApp.database().ref("your-reference-here"); 
```

## Running the project

Once you've got all the setup sorted, you want to run the project locally to ensure that your code compiles and your server returns the expected data. 

To run the project, from the command line, execute the following:

```bash
firebase serve
```

You should be met with the following:

```bash

=== Serving from '{your directory}/{your project folder}'...

i  functions: Watching "{your directory}/{your project folder}/functions" for Cloud Functions...
i  hosting: Serving hosting files from: public
✔  hosting: Local server: http://localhost:5000
✔  functions[app]: http function initialized (http://localhost:5001/{your project}/us-central1/app).
```

You can then navigate to **http://localhost:5000/get-my-random-data** and you should get a JSON result of your database data.

## Deploying the project

To deploy the project, all you need to do is run the script:

```bash
firebase deploy --only functions, hosting
```

> Should you run into any issues, run `firebase deploy` without any additional params to see if that works.

This should then deploy your site to firebase.

# NOTES

Although hosting through firebase is free, you may be required to upgrade your package for the *functions* hosting. This may result in a minor cost, depending on requests made or file sizes. 

> Be sure to checkout the plan prices before making the decision.

Even though you may be charged to pay for function hosting, static site hosting is completely free. 

> This includes an SSL certificate for your static website as well. 