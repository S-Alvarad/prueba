import type { NextConfig } from "next";
import os from "os";

// Función para obtener la IP local de tu red
function getLocalIP(): string {
  const interfaces = os.networkInterfaces();

  for (const name of Object.keys(interfaces)) {
    const iface = interfaces[name];
    if (!iface) continue;

    for (const config of iface) {
      if (config.family === "IPv4" && !config.internal) {
        return config.address;
      }
    }
  }

  return "localhost";
}

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_API_URL: `http://${getLocalIP()}:4000`,
  },
};

export default nextConfig;
