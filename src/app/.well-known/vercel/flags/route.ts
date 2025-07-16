import { getProviderData, createFlagsDiscoveryEndpoint } from "flags/next";
import * as flags from "@features/common/shared/flags";

export const GET = createFlagsDiscoveryEndpoint(() => getProviderData(flags));
