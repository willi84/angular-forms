// set domain and context pathes
const PROXY_CONFIG = [
    {
        context: [
            '/api/'
        ],
        'target': 'https://www.domain.de/',
        'secure': false
    }
];

module.exports = PROXY_CONFIG;
