import PUBLIC_RUNTIME_CONFIG from "@/config/RuntimeConfig.mjs";
import getConfig from 'next/config';

export const ENV_VARS: typeof PUBLIC_RUNTIME_CONFIG = getConfig().publicRuntimeConfig;
