
module.exports = {
    list: {
        '123': {
            name: 'My Application',
            secret: 'abc',
            folder: 'my_application',
            releases: [
                {
                    version: '1.0.0',
                    //url: 'http://mycompany.com/myapp/releases/myrelease',
                    name: 'My Release Name',
                    notes: 'Theses are some release notes innit',
                    pub_date: '2013-09-18T12:29:53+01:00' // ISO 8601.
                }
            ]
        }
    }
}