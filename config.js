const config = {
	"gatsby": {
		"pathPrefix": "/",
		"siteUrl": "https://learn.yugabyte.com",
		"gaTrackingId": null
	},
	"header": {
		"logoLink": "/",
		"title": "Tutorials",
		"githubUrl": "https://github.com/YugaByte/yugabyte-db/wiki",
		"helpUrl": "",
		"tweetText": "",
		"links": [
			{ "text": "", "link": ""}
		],
	},
	"sidebar": {
		"forcedNavOrder": [
			"/introduction",
			"/ysql/Home"
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
		"ogImage": null,
		"docsLocation": "https://github.com/YugaByte/yugabyte-db/wiki",
		"favicon": "https://docs.yugabyte.com/images/favicon.ico"
	},
	"courses": [
		{
			"title": "Fundamentals of YSQL",
			"description": "Step by step to learn how to install and use YugaByte SQL.",
			"duration": "2 hrs"
		},
		{
			"title": "Lorem ipsum dolor sit amet",
			"description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim",
			"duration": "1.5 hrs"
		},
		{
			"title": "Lorem ipsum dolor sit amet",
			"description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim",
			"duration": "76 min"
		},
		{
			"title": "Lorem ipsum dolor sit amet",
			"description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim",
			"duration": "30 min"
		}
	]
};

module.exports = config;