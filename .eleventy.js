const { DateTime } = require('luxon');
const fs = require('fs');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const excerpt = require('eleventy-plugin-excerpt');

module.exports = (eleventyConfig) => {
    eleventyConfig.addPlugin(pluginRss);
    eleventyConfig.addPlugin(excerpt);
    eleventyConfig.addPlugin(pluginSyntaxHighlight);
    eleventyConfig.setDataDeepMerge(true);

    eleventyConfig.addLayoutAlias('post', 'layouts/post.njk');

    eleventyConfig.addFilter('readableDate', (dateObj) => {
        return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('dd LLL yyyy');
    });

    // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
    eleventyConfig.addFilter('htmlDateString', (dateObj) => {
        return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd');
    });

    // Get the first `n` elements of a collection.
    eleventyConfig.addFilter('head', (array, n) => {
        if (n < 0) {
            return array.slice(n);
        }

        return array.slice(0, n);
    });

    /*
    set the timestamp outside of the filter, otherwise
    each time it's use the files will have a subtly different timestamp
    which if the same two static files are included it throws things off
    */
    var date = new Date();
    var ts = date.getTime();

    eleventyConfig.addFilter(
        'tsUrl',
        /**
         * @param {string} url
         */ function (url) {
            const [urlPart, paramPart] = url.split('?');
            const params = new URLSearchParams(paramPart || '');
            params.set('ts', `${ts}`);
            return `${urlPart}?${params}`;
        },
    );

    eleventyConfig.addFilter('vercelUrl', function (url) {
        var base = process.env.VERCEL_URL;
        if (!base) {
            base = 'localhost:3000';
        }

        if (!base.startsWith('http')) {
            base = 'https://' + base;
        }

        var u = new URL(url, base);
        return u.toString();
    });

    eleventyConfig.addCollection('tagList', require('./_11ty/getTagList'));

    eleventyConfig.addPassthroughCopy('src/img/**/*');
    eleventyConfig.addPassthroughCopy('src/posts/img/**/*');

    /* Markdown Plugins */
    let markdownIt = require('markdown-it');
    let options = {
        html: true,
        breaks: false,
        linkify: true,
    };

    eleventyConfig.setLibrary('md', markdownIt(options));

    eleventyConfig.setBrowserSyncConfig({
        callbacks: {
            ready: function (err, browserSync) {
                const content_404 = fs.readFileSync('_site/404.html');

                browserSync.addMiddleware('*', (req, res) => {
                    // Provides the 404 content without redirect.
                    res.write(content_404);
                    res.end();
                });
            },
        },
    });

    return {
        templateFormats: ['md', 'njk', 'html', 'liquid'],

        // If your site lives in a different subdirectory, change this.
        // Leading or trailing slashes are all normalized away, so don’t worry about it.
        // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
        // This is only used for URLs (it does not affect your file structure)
        pathPrefix: '/',

        markdownTemplateEngine: 'liquid',
        htmlTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',
        passthroughFileCopy: true,
        dir: {
            input: 'src',
            includes: '_includes',
            data: '_data',
            output: '_site',
        },
    };
};
