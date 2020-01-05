const config = {
	"gatsby": {
		"pathPrefix": "/",
		"siteUrl": "https://learn.yugabyte.com",
		"gaTrackingId": null
	},
	"header": {
		"logoLink": "/",
		"title": "",
		"helpUrl": "",
		"githubUrl": "https://github.com/Yugabyte/yugabyte-db",
		"slackUrl": "https://www.yugabyte.com/slack",

		"links": [
			{ "text": "", "link": ""}
		],
	},
	"sidebar": {
		// "forcedNavOrder": [
		// 	"/prerequisites",
		// 	"/fundamentals",
		// 	"/joins",
		// 	"/sample-apps"
		// ],
		"links": [
			{ "text": "YugabyteDB", "link": "https://yugabyte.com"},
			{ "text": "GitHub", "link": "https://github.com/yugabyte/yugabyte-db"},
			{ "text": "Slack", "link": "https://www.yugabyte.com/slack"},
		],
		"frontline": false,
		"ignoreIndex": true,
	},
	"siteMetadata": {
		"title": "Learn YugabyteDB",
		"description": "Documentation built with mdx. Powered by Hasura's Gatsby Gitbook project.",
		"ogImage": "https://download.yugabyte.com/statics/og-image.jpg",
		"docsLocation": "https://github.com/Yugabyte/yugabyte-db/tree/master/community/learn/content",
		"favicon": "https://docs.yugabyte.com/images/favicon.ico"
	},
	"courses": [
		{
			"title": "Fundamentals of YSQL",
			"category": "YSQL Basics",
			"description": "Step by step to learn how to install and use Yugabyte SQL.",
			"url": "/fundamentals"
		},
		{
			"title": "JOINs",
			"category": "YSQL Basics",
			"description": "Learn how to use YSQL interface to query data and handle JOINs.",
			"url": "/joins"
		},
		{
			"title": "Table Management",
			"category": "YSQL Advanced Topics",
			"description": "Coming soon!",
			"disabled": true
		},
		{
			"title": "Constraints",
			"category": "YSQL Basics",
			"description": "Coming soon!",
			"disabled": true
		},
		{
			"title": "Datatypes",
			"category": "YSQL Basics",
			"description": "Coming soon!",
			"disabled": true
		},
		{
			"title": "Schemas",
			"category": "YSQL Advanced Topics",
			"description": "Coming soon!",
			"disabled": true
		},
		{
			"title": "Expressions & Operators",
			"category": "YSQL Advanced Topics",
			"description": "Coming soon!",
			"disabled": true
		},
		{
			"title": "Stored Procedures",
			"category": "YSQL Advanced Topics",
			"description": "Coming soon!",
			"disabled": true
		},
		{
			"title": "Indexes",
			"category": "YSQL Basics",
			"description": "Coming soon!",
			"disabled": true
		},
		{
			"title": "Views",
			"category": "YSQL Advanced Topics",
			"description": "Coming soon!",
			"disabled": true
		},
		{
			"title": "Window Functions",
			"category": "YSQL Advanced Topics",
			"description": "Coming soon!",
			"disabled": true
		},
		{
			"title": "Extensions",
			"category": "YSQL Advanced Topics",
			"description": "Coming soon!",
			"disabled": true
		},
		{
			"title": "Database Management",
			"category": "YSQL Advanced Topics",
			"description": "Coming soon!",
			"disabled": true
		}
	]
};

module.exports = config;