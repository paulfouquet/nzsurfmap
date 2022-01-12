import { CfnOutput, Stack, StackProps, App, Duration } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Distribution } from 'aws-cdk-lib/aws-cloudfront';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { Rule, Schedule } from 'aws-cdk-lib/aws-events';
import { LambdaFunction } from 'aws-cdk-lib/aws-events-targets';

export class ForecastExtractorStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const bucket = new Bucket(this, 'Bucket', { publicReadAccess: false });

    const app = new lambda.NodejsFunction(this, 'AppHandler', {
      entry: 'src/lambda/app.ts',
      handler: 'handler',
      environment: { CACHE_PREFIX: `s3://${bucket.bucketName}`, MSW_API_KEY: 'TO_DEFINE' },
    });

    bucket.grantReadWrite(app);

    const distribution = new Distribution(this, 'distro', {
      defaultBehavior: {
        origin: new S3Origin(bucket),
      },
      defaultRootObject: 'index.html',
    });

    const deployment = new BucketDeployment(this, 'nzsurfmap-s3bucketdeployment', {
      sources: [Source.asset('./dist')],
      destinationBucket: bucket,
      distribution: distribution,
      distributionPaths: ['/*'],
      prune: false,
    });

    const rule = new Rule(this, 'Rule', { schedule: Schedule.rate(Duration.hours(1)) });
    rule.addTarget(new LambdaFunction(app));

    new CfnOutput(this, 'BucketName', { value: bucket.bucketName });
    new CfnOutput(this, 'Distribution', { value: distribution.distributionDomainName });
  }
}

const app = new App();
new ForecastExtractorStack(app, 'ForecastExtractorStack');
