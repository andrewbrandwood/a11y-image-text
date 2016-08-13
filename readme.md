# Basic site setup build with node.js

This repository sets you up with a ready to run [node.js](https://nodejs.org) website using express.

The site uses [Gulp](https://www.google.com) as a task runner.

The site is setup to use Harry Roberts [csswizardry's](https://github.com/csswizardry) ITCSS (inverted triangle) methodology. See [Managing CSS Projects with ITCSS](https://speakerdeck.com/dafed/managing-css-projects-with-itcss) for further details.

This setup is purposely light of gulp tasks and does the very basics to get you up and running. It is highly recommended that you add minification tasks for any production code.

## Installation

Do one of the following

* Clone the git repo - git@github.com:andrewbrandwood/node-basic-site.git
* install from bower - bower install node-basic-site

then...	  

### Node (Server side setup).

* Open command prompt (or Terminal on mac).
* Navigate to the project root.
* run - npm install
* run - node website.js

### Gulp (Client side setup).

* Open a new command prompt (or Terminal on mac).
* Navigate to public folder from the root of the website
* run - gulp

### 3rd party plugin notes.

#### [gulp-sass-generate-contents](https://github.com/andrewbrandwood/gulp-sass-generate-contents)
To enable the compiling of a list of contents in the main scss file and to import all the correct files.  It is required to have a comment at the top of each sass file. 

anything on the first line other than a double slash // will result in the file being ignored from the contents and the imports. 

#### [run-sequence](https://www.npmjs.com/package/run-sequence)
Gulp is an asynchronous task runner.  We need the gulp-sass-generate-contents to run and complete before we can compile the sass.  The run-sequence plugin allows us to run the contents file before compiling our SASS. 
