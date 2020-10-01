import merge from 'lodash/merge';
import registry from 'assets/generated/pm/registry.homestead.json';
import registryKovan from 'assets/generated/pm/registry.kovan.json';
import registrybscmainnet from 'assets/generated/pm/registry.bscmainnet.json';
import registrybsctestnet from 'assets/generated/pm/registry.bsctestnet.json';
import homestead from '@/config/homestead.json';
import staging from '@/config/homestead.staging.json';
import kovan from '@/config/kovan.json';
import bscmainnet from '@/config/bscmainnet.json';
import bsctestnet from '@/config/bsctestnet.json';
import { clone } from '@/helpers/utils';

const configs = {
  production: { homestead, kovan, bscmainnet, bsctestnet },
  staging: { homestead: merge(clone(homestead), staging), kovan, bscmainnet, bsctestnet }
};
configs.production.homestead = merge(registry, configs.production.homestead);
configs.production.kovan = merge(registryKovan, configs.production.kovan);
configs.production.bscmainnet = merge(registrybscmainnet, configs.production.bscmainnet);
configs.production.bsctestnet = merge(registrybsctestnet, configs.production.bsctestnet);
configs.staging.homestead = merge(registry, configs.staging.homestead);
configs.staging.kovan = merge(registryKovan, configs.staging.kovan);
configs.staging.bscmainnet = merge(registrybscmainnet, configs.staging.bscmainnet);
configs.staging.bsctestnet = merge(registrybsctestnet, configs.staging.bsctestnet);
const env = process.env.VUE_APP_ENV || 'production';
const network = process.env.VUE_APP_NETWORK || 'homestead';

export default configs[env][network];
