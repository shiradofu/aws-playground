#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { VpcLambdaS3Stack } from '../lib/vpc-lambda-s3-stack';

const app = new App();
new VpcLambdaS3Stack(app, 'VpcLambdaS3Stack');
