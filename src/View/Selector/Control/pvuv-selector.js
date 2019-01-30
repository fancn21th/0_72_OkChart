import { createSelect } from '../../../Utils/HtmlElementBuilder'

const PvuvSelector = function() {
    this.selector = createSelect({
        options: [{
                text: 'pv',
                value: 'ga:pageviews',
                selected: true,
            },
            {
                text: 'uv',
                // value: 'ga:uniquePageviews',
                value: 'ga:users',
            },
        ],
    })
}

PvuvSelector.prototype = {
}

