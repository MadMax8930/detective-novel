import { GetServerSideProps } from 'next';
import { getSessionUser } from '@/lib/sessionAuth';
import { SessionUserProps } from '@/types';
import prismadb from '@/lib/prismadb';

export const getAdminServerSideProps: GetServerSideProps = async (context) => {
   const sessionUser: SessionUserProps | null = await getSessionUser(context.req);

   // if (!sessionUser || !sessionUser.email) {
   //    return {
   //       redirect: {
   //          destination: '/',
   //          permanent: false,
   //       },
   //    };
   // }

   const user = await prismadb.user.findUnique({ where: { email: sessionUser?.email } });

   if (!user?.adminId) {
      return {
         redirect: {
            destination: '/profile',
            permanent: false,
         },
      };
   }

   const adminToken = context.req.cookies['next-auth.admin-token'] || null;

   return {
      props: {
         adminToken,
      },
   };
};