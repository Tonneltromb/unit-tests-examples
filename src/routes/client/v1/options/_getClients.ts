import { RouteOptions } from '@hapi/hapi';

import { pagination } from '../../../../common/joi_chemas/pagination';

const options: RouteOptions = {
  validate: {
    query: {
      ...pagination,
    },
  },
};

export default options;
