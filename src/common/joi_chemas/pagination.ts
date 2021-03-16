import * as Joi from 'joi';

export const pagination = {
  page: Joi.number().integer().description('страница'),
  size: Joi.number().integer().description('количество записей'),
};
