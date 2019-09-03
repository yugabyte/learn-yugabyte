const config = {
	"gatsby": {
		"pathPrefix": "/",
		"siteUrl": "https://learn.yugabyte.com",
		"gaTrackingId": null
	},
	"header": {
		"logoLink": "/",
		"title": "Tutorials",
		"helpUrl": "",
		"githubUrl": "https://github.com/YugaByte/yugabyte-db",
		"slackUrl": "https://www.yugabyte.com/slack",

		"links": [
			{ "text": "", "link": ""}
		],
	},
	"sidebar": {
		"forcedNavOrder": [
			"/ysql/Home",
			"/prerequisites",
			"/joins",
			"/ysql"
		],
		"links": [
			{ "text": "YugaByte DB", "link": "https://yugabyte.com"},
			{ "text": "GitHub", "link": "https://github.com/yugabyte/yugabyte-db"},
			{ "text": "Slack", "link": "https://www.yugabyte.com/slack"},
		],
		"frontline": false,
		"ignoreIndex": true,
	},
	"siteMetadata": {
		"title": "YugaByte DB | Tutorials",
		"description": "Documentation built with mdx. Powered by Hasura's Gatsby Gitbook project.",
		"ogImage": "https://download.yugabyte.com/statics/og-image.jpg",
		"docsLocation": "https://github.com/YugaByte/yugabyte-db/wiki",
		"favicon": "https://docs.yugabyte.com/images/favicon.ico"
	},
	"courses": [
		{
			"title": "Fundamentals of YSQL",
			"description": "Step by step to learn how to install and use YugaByte SQL.",
		}
	]
};

module.exports = config;