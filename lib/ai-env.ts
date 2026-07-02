export function ensureGatewayEnv() {
  const gatewayKey = process.env.AI_GATEWAY_API_KEY;

  if (gatewayKey && !process.env.AI_GATEWAY_API_KEY) {
    process.env.AI_GATEWAY_API_KEY = gatewayKey;
  }

  if (!gatewayKey && !process.env.VERCEL_OIDC_TOKEN) {
    throw new Error('AI Gateway credentials are missing.');
  }
}
