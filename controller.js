const semver = require('semver')

const config = require('./config')
const repositories = require('./repositories')


function lookup (id, secret, callback) {
    if ( ! (id in repositories.list)) {
        return callback('Invalid identifier')
    }

    let repo = repositories.list[id]

    if (repo.secret !== secret) {
        return callback('Invalid secret')
    }

    return callback(null, repo)
}

module.exports = {
    update (req, res) {
        console.log('controller.update')

        const channel = req.query.channel || config.channels[0]

        if ( ! config.channels.includes(channel)) {
            res.status(400).json({
              error: `Invalid channel '${channel}'.`
            })
        }

        const platform = req.query.platform

        if ( ! config.platforms.includes(platform)) {
            res.status(400).json({
              error: `Invalid platform '${platform}'.`
            })
        }

        const version = req.query.version

        if ( ! semver.valid(version)) {
            res.status(400).json({
              error: `Invalid version '${version}'.`
            })
        }

        console.log('platform=%s, version=%s, channel=%s', platform, version, channel)

        const id = req.query.id
        const secret = req.query.secret

        console.log('id=%s, secret=%s', id, secret)

        lookup(id, secret, (err, repo) => {
            if (err) {
                res.status(400).json({
                  error: err
                })
            }

            let latest = repo.releases[0]

            //const latestVersion = semver.clean(latestRelease.tag_name);
            let shouldUpdate = semver.lt(version, latest.version)

            console.log('latest.version=%s, shouldUpdate=%s', latest.version, shouldUpdate)

            // Nothing to update.
            if ( ! shouldUpdate) {
                res.status(204).end()
                return
            }

            latest.url = config.public.url + `/download?version=latest` +
                `&platform=${platform}` +
                `&channel=${channel}` +
                `&id=${id}` +
                `&secret=${secret}`

            res.json(latest)
            return
        })

        //res.json(repo)
    },
    download (req, res) {
        console.log('controller.download')

        const channel = req.query.channel || config.channels[0]

        if ( ! config.channels.includes(channel)) {
            res.status(400).json({
              error: `Invalid channel '${channel}'.`
            })
        }

        const platform = req.query.platform

        if ( ! config.platforms.includes(platform)) {
            res.status(400).json({
              error: `Invalid platform '${platform}'.`
            })
        }

        const version = req.query.version

        if ((version !== 'latest') && ( ! semver.valid(version))) {
            res.status(400).json({
              error: `Invalid version '${version}'.`
            })
        }

        // Platform: darwin or win32
        const extension = 'zip'

        /*
        // Release filename determined by platform.
        let pattern = null;
        const standalone  = req.query.standalone
        switch (platform) {
            case 'darwin':
                pattern = standalone ? config.patterns.darwin.zip : config.patterns.darwin.dmg
                break;
            case 'win32':
                pattern = standalone ? config.patterns.win32.zip : config.patterns.win32.installer
                break;
            case 'linux':
                const arch = req.query.arch;
                const pkg  = req.query.pkg;

                if ( ! ['i386', 'amd64', 'x86_64'].includes(arch)) {
                    res.status(400).json({
                      error: `Invalid arch '${arch}'.`
                    })
                }

                if ( ! ['deb', 'rpm'].includes(pkg)) {
                    res.status(400).json({
                      error: `Invalid pkg '${pkg}'.`
                    })
                }
                pattern = config.patterns.linux[pkg][arch]
                break
        }
        */

        console.log('platform=%s, version=%s, channel=%s, extension=%s', platform, version, channel, extension)

        const id = req.query.id
        const secret = req.query.secret

        console.log('id=%s, secret=%s', id, secret)

        lookup(id, secret, (err, repo) => {
            if (err) {
                res.status(400).json({
                  error: err
                })
            }

            // TODO: Obtain a particular release using the requested version number.
            let latest = repo.releases[0]

            latest.url = config.releases.url + `/${repo.folder}/${latest.version}-${platform}.${extension}`

            res.redirect(302, latest.url);
            //res.json(latest)
            return
        })
    }
}