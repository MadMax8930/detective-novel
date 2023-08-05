import type { Metadata } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

type RootLayoutProps = {
   children: React.ReactNode;
   metadata: Metadata;
};

export default function RootLayout({ children, metadata }: RootLayoutProps){
   const title = metadata?.title?.toString();
   const description = metadata?.description?.toString();
   const keywords = metadata?.keywords?.toString();
   const applicationName = metadata?.applicationName?.toString();
   const themeColor = metadata?.themeColor?.toString();

   const router = useRouter();
   useEffect(() => {
     if (router.pathname === '/_layout') {
       router.replace('/');
     }
   }, [router]);

  return (
   <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={applicationName} />
      <meta name="theme-color" content={themeColor}/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="ru" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="robots" content="index, follow" />
      <meta name="publisher" content="Vladislav Surnin" />

      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://your-website-url.com/placeholder-image.jpg" />
      <meta property="og:url" content="https://vladnovels.com/" />

      <div className="relative">
         <div className="h-screen bg-[url('/images/notfound.jpg')] bg-no-repeat bg-fixed bg-center bg-cover">
            {children}
         </div>
      </div>
   </>
  )
}