import { RouteOptions } from '@hapi/hapi';
import * as Joi from 'joi';

const options: RouteOptions = {
  validate: {
    query: {
      accountId: Joi.string().uuid({ version: 'uuidv4' }).required().description('account identifier'),
    },
  },
};

export default options;
