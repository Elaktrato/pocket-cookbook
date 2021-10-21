require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
    plugins: [
        `gatsby-plugin-glamor`,
        {
            resolve: `gatsby-plugin-typography`,
            options: {
                pathToConfigModule: `src/utils/typography`,
            },
        },
        //Here's where I include the gatsby-source-contentful plugin.
        // And also I added the spaceID and accessToken I got from my Contentful account.
        {
            resolve: `gatsby-source-contentful`,
            options: {
                spaceId: `g0b694a663ft`,
                accessToken: `cc94019b03af3894ec87eded57fffd67c6785f1c6fb6b2c3e67ded27682b0c02`,
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
    ],
    resolve: `gatsby-source-contentful`,
    options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    },
}