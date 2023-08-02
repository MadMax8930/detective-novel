import axios from 'axios'
import { useCallback, useState } from 'react'
import { signIn } from 'next-auth/react'
import { toast } from 'react-hot-toast'
import Input from '@/components/Input'

const Auth = () => {
   const [email, setEmail] = useState('');
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [variant, setVariant] = useState('login');

   const toggleVariant = useCallback(() => {
      setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login')
   },[]);

   const login = useCallback(async() => {
      try {
        await signIn('credentials', {
         email, password, callbackUrl: '/profile'
        });
        toast.success('Logged in successfully');
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong.");
      }
   }, [email, password]);

   const register = useCallback(async() => {
      try {
        await axios.post('/api/register', {
         email, username, password
        });
        toast.success("Account created.");
        login();
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong.");
      }
   }, [email, username, password, login]);

   return (
      <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-fixed bg-center bg-cover">
         <div className="bg-black w-full h-full lg:bg-opacity-50">
            
            <div className="flex justify-center pt-16">
               <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                  {/* Title */}
                  <div className="flex justify-between pb-5">
                     <h2 className="text-white text-4xl mb-8 font-semibold">
                        {variant === 'login' ? 'Sign in' : 'Register'}
                     </h2>
                     <img src="/images/logo.png" alt="Logo" className="h-9" />
                  </div>
                  {/* Form */}
                  <div className="flex flex-col gap-4">
                     {variant === 'register' && (
                     <Input label="Username" onChange={(e: any) => setUsername(e.target.value)} value={username} id="name" /> )}
                     <Input label="Email" onChange={(e: any) => setEmail(e.target.value)} value={email} id="email" type="email" />
                     <Input label="Password" onChange={(e: any) => setPassword(e.target.value)} value={password} id="password" type="password" minLength={8}/>
                  </div>
                  {/* Button */}
                  <button onClick={variant === 'login' ? login : register} className="bg-primary-red py-3 text-white rounded-md w-full mt-10 hover:bg-primary-red-100 hover:text-black transition">
                     {variant === 'login' ? 'Login' : 'Sign up'}
                  </button>
                  {/* Switcher */}
                  <p className="text-neutral-500 mt-12 justify-between flex">
                     {variant === 'login' ? 'First time in here?' : 'Already have an account?'}
                     <span onClick={toggleVariant} className="text-white ml-1 hover:underline cursor-pointer">
                       {variant === 'login' ? 'Create an account' : 'Login'}
                     </span>
                  </p>
               </div>
            </div>

         </div>
      </div>
   );
};

export default Auth