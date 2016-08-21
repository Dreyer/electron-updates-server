
const host = process.env.UPDATES_HOST || '127.0.0.1'
const port = process.env.UPDATES_PORT || process.env.PORT || 3000

const domain = `http://${host}:${port}`

module.exports = {
    host,
    port,
    public: {
        url: domain
    },
    releases: {
        url: `${domain}/releases`
    },
    patterns: {
        darwin: {
            dmg: /-darwin\.dmg/,
            zip: /-darwin\.zip/
        },
        win32: {
            installer: /-win32-setup\.exe/,
            zip: /-win32-portable\.zip/
        },
        linux: {
            deb: {
                i386: /-linux-i386\.deb/,
                amd64: /-linux-amd64\.deb/
            },
            rpm: {
                i386: /-linux-i386\.rpm/,
                x86_64: /-linux-x86_64\.rpm/
            }
        }
    },
    platforms: ['darwin', 'win32'],
    channels: ['dev', 'beta', 'stable'],
    defaultChannel: 'stable'
}