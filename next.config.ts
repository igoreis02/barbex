import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // A permissão deve ficar AQUI, direto na raiz, fora do 'experimental'
  allowedDevOrigins: [
    '3000-firebase-barbex-1774994788033.cluster-fsmcisrvfbb5cr5mvra3hr3qyg.cloudworkstations.dev'
  ],
};

export default nextConfig;