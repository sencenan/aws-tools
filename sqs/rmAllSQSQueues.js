'use strict';

var
	_ = require('lodash'),
	AWS = require('aws-sdk');

var awsConfig = {};

awsConfig.credentials = new AWS.SharedIniFileCredentials();

if (!awsConfig.region) {
	awsConfig.region = 'us-east-1';
}

AWS.config.update(awsConfig);

// control API versions
awsConfig.apiVersions = {
	sqs: '2012-11-05'
};

var sqs = new AWS.SQS(
	_.assign(awsConfig, {
		endpoint: 'sqs.us-east-1.amazonaws.com'
	})
);

sqs.listQueues(
	{
		QueueNamePrefix: process.argv[2]
	},
	function(error, resp) {
		resp.QueueUrls && resp.QueueUrls.forEach(function(url) {
			sqs.deleteQueue(
				{
					QueueUrl: url
				},
				function() {
					console.log(arguments)
				}
			);
		});
	}
);
