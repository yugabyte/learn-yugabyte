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
		"githubUrl": "https://github.com/Yugabyte/yugabyte-db",
		"slackUrl": "https://www.yugabyte.com/slack",

		"links": [
			{ "text": "", "link": ""}
		],
	},
	"sidebar": {
		"forcedNavOrder": [
			"/prerequisites",
			"/fundamentals",
			"/joins",
			"/ysql"
		],
		"links": [
			{ "text": "Yugabyte DB", "link": "https://yugabyte.com"},
			{ "text": "GitHub", "link": "https://github.com/yugabyte/yugabyte-db"},
			{ "text": "Slack", "link": "https://www.yugabyte.com/slack"},
		],
		"frontline": false,
		"ignoreIndex": true,
	},
	"siteMetadata": {
		"title": "Yugabyte DB | Tutorials",
		"description": "Documentation built with mdx. Powered by Hasura's Gatsby Gitbook project.",
		"ogImage": "https://download.yugabyte.com/statics/og-image.jpg",
		"docsLocation": "https://github.com/Yugabyte/yugabyte-db/tree/master/community/learn/content",
		"favicon": "https://docs.yugabyte.com/images/favicon.ico"
	},
	"courses": [
		{
			"title": "Fundamentals of YSQL",
			"description": "Step by step to learn how to install and use Yugabyte SQL.",
			"url": "/fundamentals"
		},
		{
			"title": "JOINs",
			"description": "Learn how to use YSQL interface to query data and handle JOINs.",
			"url": "/joins"
		},
		{
			"title": "Table Management",
			"description": "Coming soon!",
			"disabled": true
		},
		{
			"title": "Constraints",
			"description": "Coming soon!",
			"disabled": true
		},
		{
			"title": "Datatypes",
			"description": "Coming soon!",
			"disabled": true
		},
		{
			"title": "Schemas",
			"description": "Coming soon!",
			"disabled": true
		},
		{
			"title": "Expressions & Operators",
			"description": "Coming soon!",
			"disabled": true
		},
		{
			"title": "Stored Procedures",
			"description": "Coming soon!",
			"disabled": true
		},
		{
			"title": "Indexes",
			"description": "Coming soon!",
			"disabled": true
		},
		{
			"title": "Views",
			"description": "Coming soon!",
			"disabled": true
		},
		{
			"title": "Window Functions",
			"description": "Coming soon!",
			"disabled": true
		},
		{
			"title": "Extensions",
			"description": "Coming soon!",
			"disabled": true
		},
		{
			"title": "Database Management",
			"description": "Coming soon!",
			"disabled": true
		}
	]
};

module.exports = config;