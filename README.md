# Electron Updates Server

A minimal node.js server for developers to support Electron's [autoUpdater](http://electron.atom.io/docs/api/auto-updater/) which uses a static list of repositories for your releases.

It provides a `id` and `secret` combination to restrict access to releases which might be helpful for in-house projects.

## Endpoints

### /update

For example for Mac OS X (darwin):

`GET /update?platform=darwin&version=0.9.9&channel=stable&id=123&secret=ABC`

Sample response:

```json
{
  "url": "http://www.example.org/releases/app/1.0.0-darwin.zip",
  "name": "1.0.0",
  "notes": "Theses are some release notes innit",
  "pub_date": "2013-09-18T12:29:53+01:00"
}
```

### /download

#### OS X

`GET /download?platform=darwin&version=latest&channel=stable&id=123&secret=abc`

Get the download URL of the latest OS X release (zip) and redirect to that URL.


## Deployment

1. Clone the project.

  ```
  git clone https://github.com/Dreyer/electron-updates-server.git
  cd electron-updates-server
  ```

2. Install dependencies.

  ```
  npm install
  ```

3. Create your list of repositories and edit the config file.

  ```
  cp repositories-template.js repositories.js
  vi repositories.js
  ```
  
  Static list of repositories and releases looks like the below:
  
  ```javascript
  // repositories.js
  {
        '123': {
            name: 'My Application',
            secret: 'abc',
            folder: 'my_application',
            releases: [
                {
                    version: '1.0.0',
                    name: 'My Release Name',
                    notes: 'Theses are some release notes innit',
                    pub_date: '2013-09-18T12:29:53+01:00' // ISO 8601.
                }
            ]
        }
    }
  ```
  
  The `folder` property with the value of `my_application` relates to the directory in which the release exists. 
  
  It should conform to the following folder structure to be served up correctly: 
 `./public/releases/my_application/1.0.0-darwin.zip` 

4. Start the server.

  ```
  npm start
  ```