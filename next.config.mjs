/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        NEXT_PUBLIC_API_ADDRESS:process.env.NEXT_PUBLIC_API_ADDRESS
    },
    experimental:{
        serverActions:true
    },
    reactStrictMode:true,
    swcMinify:true,
};

export default nextConfig;
